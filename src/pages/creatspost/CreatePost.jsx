import { React, useState } from 'react'
import "./createpost.css"
import { FormField, Loader } from '../../components'
import { getRandomPrompt, downloadImage } from '../../utils'
import { preview } from '../../assets'


const CreatePost = () => {
    const [form, setForm] = useState({
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    }
    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/output', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                console.log(data)
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    }
    const handleDownload = (e) => {
        downloadImage(form.photo)
    }
    return (
        <section className="section">
            <div>
                <h1 className="head">Create Any Image</h1>
                <p className="title">Generate an imaginative image through Karen AI !! Remember...Be creative</p>
            </div>

            <form>
                <div className="form">
                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                </div>

                <div className="imgdiv">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className="genimg"
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="preview"
                            className="altimg"
                        />
                    )}

                    {generatingImg && (
                        <div className="loaderdiv">
                            <Loader />
                        </div>
                    )}
                </div>

                <div className="btndiv">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="genbtn"
                    >
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>

                    {form.photo ? <button
                        type="button"
                        onClick={handleDownload}
                        className="downloadbtn"
                    >
                        Download
                    </button>
                        : ""}
                </div>
                {/* For sharing community which route will be created later */}
                {/* <div className="mt-10">
                    <p className="share">** Once you have created the image you want, you can share it with others in the community **</p>
                    <button
                        type="submit"
                        className="sharebtn"
                    >
                        {loading ? 'Sharing...' : 'Share with the Community'}
                    </button>
                </div> */}
            </form>
        </section>
    )
}

export default CreatePost
