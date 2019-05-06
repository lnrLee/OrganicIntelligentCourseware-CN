from __future__ import division
from __future__ import print_function
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, LeakyReLU
from tensorflow.keras import optimizers
import numpy as np
from tensorflow.keras import backend as K
#from tensorflow.keras_contrib.layers.advanced_activations import SReLU
from tensorflow.keras.datasets import cifar10
from tensorflow.keras import utils


class SET_MLP_CIFAR10:
    def __init__(self):
        # set model parameters
        self.epsilon = 20 # control the sparsity level as discussed in the paper
        self.zeta = 0.3 # the fraction of the weights removed
        self.batch_size = 100 # batch size
        self.maxepoches = 10 # number of epochs
        self.learning_rate = 0.01 # SGD learning rate
        self.num_classes = 10 # number of classes
        self.momentum=0.9 # SGD momentum

        # generate an Erdos Renyi sparse weights mask for each layer


        # initialize layers weights
        self.w1 = None
        self.w2 = None
        self.w3 = None
        self.w4 = None

        # initialize weights for SReLu activation function
        #self.wSRelu1 = None
        #self.wSRelu2 = None
        #self.wSRelu3 = None

        # create a SET-MLP model
        self.create_model()

        # train the SET-MLP model
        self.train()

    def weightsEvolution(self):
        # this represents the core of the SET procedure. It removes the weights closest to zero in each layer and add new random weights
        self.w1 = self.model.get_layer("sparse_1").get_weights()
        self.w2 = self.model.get_layer("sparse_2").get_weights()
        self.w3 = self.model.get_layer("sparse_3").get_weights()
        self.w4 = self.model.get_layer("dense_4").get_weights()

    def create_model(self):

        # create a SET-MLP model for CIFAR10 with 3 hidden layers
        self.model = Sequential()
        self.model.add(Flatten(input_shape=(32, 32, 3)))
        self.model.add(Dense(4000, name="sparse_1",weights=self.w1))
        self.model.add(LeakyReLU(alpha=0.2))
        self.model.add(Dropout(0.3))
        self.model.add(Dense(1000, name="sparse_2",weights=self.w2))
        self.model.add(LeakyReLU(alpha=0.2))
        self.model.add(Dropout(0.3))
        self.model.add(Dense(4000, name="sparse_3",weights=self.w3))
        self.model.add(LeakyReLU(alpha=0.2))
        self.model.add(Dropout(0.3))
        self.model.add(Dense(self.num_classes, name="dense_4",weights=self.w4)) #please note that there is no need for a sparse output layer as the number of classes is much smaller than the number of input hidden neurons
        self.model.add(Activation('softmax'))

    def train(self):

        # read CIFAR10 data
        [x_train,x_test,y_train,y_test]=self.read_data()

        #data augmentation
        datagen = ImageDataGenerator(
            featurewise_center=False,  # set input mean to 0 over the dataset
            samplewise_center=False,  # set each sample mean to 0
            featurewise_std_normalization=False,  # divide inputs by std of the dataset
            samplewise_std_normalization=False,  # divide each input by its std
            zca_whitening=False,  # apply ZCA whitening
            rotation_range=10,  # randomly rotate images in the range (degrees, 0 to 180)
            width_shift_range=0.1,  # randomly shift images horizontally (fraction of total width)
            height_shift_range=0.1,  # randomly shift images vertically (fraction of total height)
            horizontal_flip=True,  # randomly flip images
            vertical_flip=False)  # randomly flip images
        datagen.fit(x_train)

        self.model.summary()

        # training process in a for loop
        self.accuracies_per_epoch=[]
        for epoch in range(0,self.maxepoches):

            sgd = optimizers.SGD(lr=self.learning_rate, momentum=self.momentum)
            self.model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

            historytemp = self.model.fit_generator(datagen.flow(x_train, y_train,
                                             batch_size=self.batch_size),
                                steps_per_epoch=x_train.shape[0]//self.batch_size,
                                epochs=epoch,
                                validation_data=(x_test, y_test),
                                 initial_epoch=epoch-1)

            self.accuracies_per_epoch.append(historytemp.history['val_acc'][0])

            #ugly hack to avoid tensorflow memory increase for multiple fit_generator calls. Theano shall work more nicely this but it is outdated in general
            self.weightsEvolution()
            K.clear_session()
            self.create_model()

        self.accuracies_per_epoch=np.asarray(self.accuracies_per_epoch)

    def read_data(self):

        #read CIFAR10 data
        (x_train, y_train), (x_test, y_test) = cifar10.load_data()
        y_train = utils.to_categorical(y_train, self.num_classes)
        y_test = utils.to_categorical(y_test, self.num_classes)
        x_train = x_train.astype('float32')
        x_test = x_test.astype('float32')

        #normalize data
        xTrainMean = np.mean(x_train, axis=0)
        xTtrainStd = np.std(x_train, axis=0)
        x_train = (x_train - xTrainMean) / xTtrainStd
        x_test = (x_test - xTrainMean) / xTtrainStd

        return [x_train, x_test, y_train, y_test]

if __name__ == '__main__':

    # create and run a SET-MLP model on CIFAR10

    model=SET_MLP_CIFAR10()

    # save accuracies over for all training epochs
    # in "results" folder you can find the output of running this file
    np.savetxt("results/mlp_srelu_sgd_cifar10_acc.txt", np.asarray(model.accuracies_per_epoch))