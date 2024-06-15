from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Define the paths to the saved models
MODEL_PATHS = {
    "monet_generator_model.h5": "./models/monet_generator_model",
    "real_generator_model.h5": "./models/real_generator_model"
}

# Load the default model (Monet Generator)
DEFAULT_MODEL_PATH = "./models/monet_generator_model"
model = tf.keras.models.load_model(DEFAULT_MODEL_PATH)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed, "*" allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a function to process the uploaded image
def process_image(img):
    # Preprocess the image
    img = img.convert('RGB')
    img = img.resize((256, 256))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Generate image using the selected model
    # generated_img = model.predict(img_array)[0]

    # # Convert numpy array to PIL image
    # generated_img = (generated_img * 255).astype(np.uint8)
    # generated_img = Image.fromarray(generated_img)
    prediction = model.predict(img_array, training=False)[0].numpy() # make predition
    prediction = (prediction * 127.5 + 127.5).astype(np.uint8)   # re-scale
    im = Image.fromarray(prediction)
    
        

    return im

@app.post("/upload/")
async def upload_file(image: UploadFile = File(...), generator: str = Form(...)):
    # Validate the selected generator
    if generator not in MODEL_PATHS:
        raise HTTPException(status_code=400, detail="Invalid generator selected")
    
    # Load the selected model
    model_path = MODEL_PATHS.get(generator, DEFAULT_MODEL_PATH)
    model = tf.keras.models.load_model(model_path)

    # Read the uploaded image file
    contents = await image.read()
    img = Image.open(io.BytesIO(contents))

    # Process the image
    processed_img = process_image(img)

    # Save the processed image to a byte buffer
    img_byte_arr = io.BytesIO()
    processed_img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    # Return the processed image
    return StreamingResponse(img_byte_arr, media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, ssl_keyfile="server.key", ssl_certfile="server.crt", log_level="info")

