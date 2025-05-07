const crypto = require('crypto');
const stan = require('node-nats-streaming').connect(
  'test-cluster', // Replace with your actual cluster ID if different
  crypto.randomBytes(4).toString('hex'),
  { url: 'nats://localhost:4222' }
);

stan.on('connect', () => {
  console.log('Publisher connected to NATS Streaming');
  const data = JSON.stringify({
    id: '123',
    title: 'Some event',
  });

  stan.publish('event:created', data, (err, guid) => {
    if (err) {
      console.error('Publish failed:', err);
    } else {
      console.log('Event published, GUID:', guid);
    }
  });
});
