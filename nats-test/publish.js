const stan = require('node-nats-streaming').connect('clusterID', 'publisher-id', {
  url: 'http://localhost:4222',})

  stan.on('connect', ()=>{
    console.log('Publisher connected NATS');
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
    })
  })