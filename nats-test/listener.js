const crypto = require('crypto');
const stan = require('node-nats-streaming').connect(
  'test-cluster', // Cluster ID (should match your publisher and server)
  crypto.randomBytes(4).toString('hex'), // Unique client ID
  { url: 'nats://localhost:4222' } // NATS Streaming server URL
);

stan.on('connect', () => {
  console.log('Listener connected to NATS Streaming');

  // Subscription options
  const options = stan.subscriptionOptions()
    .setManualAckMode(false) // Auto-acknowledge messages
    .setDeliverAllAvailable(); // Get all available messages (including old ones)

  // Subscribe to the 'event:created' subject
  const subscription = stan.subscribe('event:created', options);

  subscription.on('message', (msg) => {
    const data = msg.getData();
    // If data is a Buffer, convert to string
    const strData = typeof data === 'string' ? data : data.toString('utf8');
    console.log(`Received event [${msg.getSequence()}]:`, strData);
  });
});
