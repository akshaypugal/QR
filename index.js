let imgBox = document.getElementById("imgBox");
let qrtext = document.getElementById("qrtext");
let qrImage = document.getElementById("qrImage");

const generate = () => {
    if (qrtext.value.length > 0) {
        // Construct the QR code URL using the entered text
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrtext.value);
        
        // Display the image box
        imgBox.classList.add("show-img");

        // Check if downloadQRCode should be called
        if (qrtext.value.length > 0) {
            downloadQRCode();
        }

    } else {
        // If no text is entered, add an "error" class to the input for styling
        qrtext.classList.add("error");

        // Remove the "error" class after 1 second using setTimeout
        setTimeout(() => {
            qrtext.classList.remove("error");
        }, 1000);
    }
};

const downloadQRCode = async () => {
    try {
        // Use await to get the resolved value of the promise
        const response = await fetch(qrImage.src);

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }

        // Use await to get the resolved value of the promise
        const blob = await response.blob();

        // Create a download link
        const downloadLink = document.createElement("a");

        // Use the Blob directly without creating an object URL
        downloadLink.href = URL.createObjectURL(blob);

        downloadLink.download = "qrcode.jpg";

        // Simulate a click on the link to trigger the download
        downloadLink.click();
    } catch (error) {
        console.error("Error downloading QR code:", error);
    }
};
