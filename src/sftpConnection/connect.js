import Client from 'ssh2-sftp-client';
let sftp = new Client();

const config = {
  host: '127.0.0.1',
  port: '22',
  username: 'sftpuser',
  password: 'YourPassword123'
};

async function connect() {
  try {
    await sftp.connect(config);
    console.log('SFTP connection established');
  } catch (error) {
    console.error('Error connecting to SFTP:', error);
  }
}

export default connect;