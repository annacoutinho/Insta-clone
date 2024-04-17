const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const uuid = require("uuid");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "insta-clone-6ae05",
  keyFilename: "insta-clone.json",
});

exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const image = request.body.image;

    if (!image) {
      console.error("Erro: Imagem não recebida corretamente.");
      return response.status(400).json({ error: "No image data received." });
    }

    try {
      fs.writeFileSync("/tmp/imageToSave.jpg", image, "base64");

      const bucket = storage.bucket("insta-clone-6ae05.appspot.com");
      const id = uuid.v4();
      bucket.upload(
        "/tmp/imageToSave.jpg",
        {
          uploadType: "media",
          destination: `/posts/${id}.jpg`,
          metadata: {
            metadata: {
              contentType: "image/jpeg",
              firebaseStorageDownloadTokens: id,
            },
          },
        },
        (err, file) => {
          if (err) {
            return response.status(500).json({ error: err });
          } else {
            const fileName = encodeURIComponent(file.name);
            const imageUrl =
              "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              fileName +
              "?alt=media&token=" +
              id;
            return response.status(201).json({ imageUrl: imageUrl });
          }
        }
      );
    } catch (err) {
      return response.status(500).json({ error: err.toString() });
    }
  });
});
