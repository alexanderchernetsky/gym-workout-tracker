const convertBase64toFile = async (imageString: string) => {
    const base64Response = await fetch(imageString);
    const blob = await base64Response.blob();

    // todo: remove hardcoded file name and type
    return new File([blob], 'File name', {type: 'image/png'});
};

export default convertBase64toFile;
