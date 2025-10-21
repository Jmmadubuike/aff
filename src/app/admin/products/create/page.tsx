"use client";

import { useState } from "react";
import api from "../../../../services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CreateProductPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        brand: "",
        category: "Unisex",
        concentration: "Body Mist",
        sizeML: 100,
        stock: 0,
        notes: "",
        longevity: "Moderate",
        sillage: "Moderate",
        featured: false,
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? Number(value)
                    : type === "checkbox"
                        ? checked
                        : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return toast.error("Product image is required");

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "notes") {
                data.append(
                    key,
                    value.toString().split(",").map((n) => n.trim()).join(",")
                );
            } else {
                data.append(key, value as any);
            }
        });
        data.append("image", image);

        setLoading(true);
        try {
            await api.post("/api/v1/products", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Product created successfully");
            router.push("/admin/products");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-black text-white">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Basic Info</h2>
                </div>
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                        required
                    />
                </div>
                {/* Description */}
                <div className="col-span-full">
                    <label htmlFor="description" className="block mb-1 text-sm font-medium text-white">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Product description"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-600 rounded bg-black text-white"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Price (₦)</label>
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Brand</label>
                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Concentration</label>
                    <select
                        name="concentration"
                        value={form.concentration}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    >
                        <option value="Parfum">Parfum</option>
                        <option value="Eau de Parfum">Eau de Parfum</option>
                        <option value="Eau de Toilette">Eau de Toilette</option>
                        <option value="Eau de Cologne">Eau de Cologne</option>
                        <option value="Attar">Attar</option>
                        <option value="Body Mist">Body Mist</option>
                    </select>
                </div>

                {/* Size & Stock */}
                <div className="md:col-span-2 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Size & Stock</h2>
                </div>
                <div>
                    <label className="block mb-1">Size (ml)</label>
                    <input
                        name="sizeML"
                        type="number"
                        value={form.sizeML}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Stock</label>
                    <input
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    />
                </div>

                {/* Scent Info */}
                <div className="md:col-span-2 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Scent Info</h2>
                </div>
                <div className="md:col-span-2">
                    <label className="block mb-1">Notes (comma separated)</label>
                    <input
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Longevity</label>
                    <select
                        name="longevity"
                        value={form.longevity}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    >
                        <option value="Light">Light</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Long-lasting">Long-lasting</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Sillage</label>
                    <select
                        name="sillage"
                        value={form.sillage}
                        onChange={handleChange}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                    >
                        <option value="Soft">Soft</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Strong">Strong</option>
                    </select>
                </div>

                {/* Featured & Image */}
                <div className="md:col-span-2 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Other Options</h2>
                </div>
                <div className="md:col-span-2 flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        className="accent-yellow-400"
                        id="featured"
                    />
                    <label htmlFor="featured" className="font-medium">Featured</label>
                </div>
                <div className="md:col-span-2">
                    <label className="block mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="p-2 border border-gray-600 rounded bg-black text-white w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
                >
                    {loading ? "Saving..." : "Create Product"}
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;
