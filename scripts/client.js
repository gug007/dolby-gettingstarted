const avengersNames = ['Thor', 'Cap', 'Tony Stark', 'Black Panther', 'Black Widow', 'Hulk', 'Spider-Man'];
let randomName = avengersNames[Math.floor(Math.random() * avengersNames.length)];

const main = async () => {
  /* Event handlers */

  // When a stream is added to the conference
  VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
    if (stream.type === 'ScreenShare') {
      return addScreenShareNode(stream);
    }

    if (stream.getVideoTracks().length) {
      // Only add the video node if there is a video track
      addVideoNode(participant, stream);
    }

    addParticipantNode(participant);
  });

  // When a stream is updated
  VoxeetSDK.conference.on('streamUpdated', (participant, stream) => {
    if (stream.type === 'ScreenShare') return;

    if (stream.getVideoTracks().length) {
      // Only add the video node if there is a video track
      addVideoNode(participant, stream);
    } else {
      removeVideoNode(participant);
    }
  });

  // When a stream is removed from the conference
  VoxeetSDK.conference.on('streamRemoved', (participant, stream) => {
    if (stream.type === 'ScreenShare') {
      return removeScreenShareNode();
    }

    removeVideoNode(participant);
    removeParticipantNode(participant);
  });

  try {
    // Initialize the Voxeet SDK
    // WARNING: It is best practice to use the VoxeetSDK.initializeToken function to initialize the SDK.
    // Please read the documentation at:
    // https://dolby.io/developers/interactivity-apis/client-sdk/initializing
    VoxeetSDK.initializeToken("eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJWb3hlZXQiLCJzdWIiOiJwYWVaWUVxX2hoMlVvUzlnQTVQOEZRPT0iLCJpYXQiOjE2MjU0NjQ4ODEsImV4cCI6MTYyNTQ2ODQ4MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJzY29wZSI6InNlc3Npb24ifQ.tyE82HRAIaBFe9XijthmmOWO7WEATGxov9B_UGHaoBGmatBHzYSsHC7SXOx7tP6h0svFKzDllQo5vObHb3N8Bw");

    // Open a session for the user
    await VoxeetSDK.session.open({ name: randomName });

    // Initialize the UI
    initUI();
  } catch (e) {
    alert('Something went wrong : ' + e);
  }
}

main();
