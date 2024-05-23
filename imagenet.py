from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from keras.preprocessing.image import load_img, img_to_array
from keras.models import Model
from matplotlib import pyplot as plt
from numpy import expand_dims
import os
import ast

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the class labels
class_labels = {}
with open('imagenet1000_clsidx_to_labels.txt', 'r') as file:
    content = file.read()
    class_labels = ast.literal_eval(content)

# Load the model
model = VGG16()

# Redefine model to output right after the first hidden layer
ixs = [2, 5, 9, 13, 17]
outputs = [model.layers[i].output for i in ixs]
model_layers = Model(inputs=model.inputs, outputs=outputs)

@app.post("/imagenet/")
async def predict(file_name: str = 'star.jpg'):
    image_path = os.path.join(os.path.dirname(__file__), 'img', 'imagenet', file_name)

    # Load the image with the required shape
    img = load_img(image_path, target_size=(224, 224))
    # Convert the image to an array
    img = img_to_array(img)
    # Expand dimensions so that it represents a single 'sample'
    img = expand_dims(img, axis=0)
    # Prepare the image (e.g., scale pixel values for VGG)
    img = preprocess_input(img)

    # Take the prediction
    preds = model.predict(img)
    top_indices = preds.argsort()[0][-4:][::-1]
    top_values = preds[0][top_indices]
    top_values = [float(value) for value in top_values]


    # Get class labels for top indices
    top_labels = [class_labels[idx] for idx in top_indices]

    # Create dictionary with labels and corresponding values
    result = dict(zip(top_labels, top_values))

    # Save the prediction image
    square = 8
    feature_maps = model_layers.predict(img)
    for fmap in feature_maps:
        # plot all 64 maps in an 8x8 squares
        ix = 1
        for _ in range(square):
            for _ in range(square):
                # specify subplot and turn of axis
                ax = plt.subplot(square, square, ix)
                ax.set_xticks([])
                ax.set_yticks([])
                # plot filter channel in grayscale
                plt.imshow(fmap[0, :, :, ix-1])
                ix += 1
        # show the figure
        plt.subplots_adjust(wspace=0, hspace=0)
        output_path = os.path.join(os.path.dirname(__file__), 'img', 'feat_maps', 'block_{ix}_map.png')
        plt.savefig(output_path, bbox_inches='tight', pad_inches=0)
        plt.close()
        break

    # Return the prediction
    return result

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
