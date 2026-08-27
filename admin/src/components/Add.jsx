import React, { useState } from "react";
import axios from "axios";

const Add = () => {
    const url = "http://localhost:4000";

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Men",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));
        if (image) formData.append("image", image);
        try {
            const res = await axios.post(`${url}/api/product/add`, formData);
            if (res.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Men",
                });
                setImage(null);
                alert("تم إضافة المنتج بنجاح!");
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ اثناء اضافه المنتج.");
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
            <form onSubmit={onSubmitHandler}>
                <div className=" relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        إضافه منتج جديد
                    </h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="إسم المنتج"
                            value={data.name}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="وصف المنتج"
                            value={data.description}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="السعر"
                            value={data.price}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`}
                        />
                        <select
                            name="category"
                            value={data.category}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white focus:ring-2 focus:ring-cyan-400 outline-none`}
                        >
                            <option value="Men" className="bg-gray-800">
                                Men
                            </option>
                            <option value="Women" className="bg-gray-800">
                                Women
                            </option>
                            <option value="Kids" className="bg-gray-800">
                                Kids
                            </option>
                            <option value="Electronics" className="bg-gray-800">
                                Electronics
                            </option>
                            <option value="Cosmetics" className="bg-gray-800">
                                Cosmetics
                            </option>
                        </select>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            className="w-full text-white"
                        />
                        Add Image
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                className="w-full h-64 object-cover rounded-2xl mt-2"
                            />
                        )}
                        <button
                            type="submit"
                            className=" w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all text-white shadow-lg mt-4 "
                        >
                            إضافة المنتج
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Add;
