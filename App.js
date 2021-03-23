import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [extra, setExtra] = useState('');
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    const foregroundSuscriber = messaging().onMessage(async remoteMessage => {
      console.log('Push Notification recibida ', remoteMessage);
      // eslint-disable-next-line no-alert
      setTitle(remoteMessage.notification.title);
      setMessage(remoteMessage.notification.body);
      if (remoteMessage.data.value1) {
        console.log('si');
        setShowExtra(true);
        setExtra(remoteMessage.data.value1);
      } else {
        console.log('no');
        setShowExtra(false);
      }
    });

    /*
    const topicSuscriber = messaging()
      .subscribeToTopic('trainers')
      .then(() => console.log('Suscrito al canal trainers'));

    const backgroundSuscriber = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Push notification en background', remoteMessage);
        // eslint-disable-next-line no-alert
        alert('Background ' + remoteMessage.notification.body);
      },
    );
    */

    return () => {
      foregroundSuscriber();
      //topicSuscriber();
      //backgroundSuscriber();
    };
  }, []);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Push Notifications</Text>
      <Text>Titulo: {title}</Text>
      <Text>Mensaje: {message}</Text>
      {showExtra && <Text>Valor Extra: {extra}</Text>}
    </View>
  );
};

export default App;
