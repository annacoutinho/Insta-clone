const functions = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'insta-clone-6ae05',
  keyFilename: 'insta-clone-6ae05-firebase-adminsdk-udto2-0268695a5a.json'
});

exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64');

      const bucket = storage.bucket('insta-clone-6ae05.appspot.com');
      const id = uuid();
      bucket.upload(
        '/tmp/imageToSave.jpg',
        {
          uploadType: 'media',
          destination: `/posts/${id}.jpg`,
          metadata: {
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: id
            }
          }
        },
        (err, file) => {
          if (err) {
            return response.status(500).json({ error: err });
          } else {
            const fileName = encodeURIComponent(file.name);
            const imageUrl =
              'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              fileName +
              '?alt=media&token=' +
              id;
            return response.status(201).json({ imageUrl });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: err });
    }
  });
});
