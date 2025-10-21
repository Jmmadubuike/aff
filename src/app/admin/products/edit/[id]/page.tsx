"use client";

import { useState, useEffect } from "react";
import api from "../../../../../services/api";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";

const EditProductPage = () => {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id;

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
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                const res = await api.get(`/api/v1/products/${productId}`);
                const data = res.data.data;
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || 0,
                    brand: data.brand || "",
                    category: data.category || "Unisex",
                    concentration: data.concentration || "Body Mist",
                    sizeML: data.sizeML || 100,
                    stock: data.stock || 0,
                    notes: data.notes?.join(", ") || "",
                    longevity: data.longevity || "Moderate",
                    sillage: data.sillage || "Moderate",
                });
            } catch (err: any) {
                toast.error("Failed to fetch product");
            } finally {
                setFetching(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "sizeML" || name === "stock"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        if (image) data.append("image", image);

        setLoading(true);
        try {
            await api.put(`/api/v1/products/${productId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Product updated successfully");
            router.push("/admin/products");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                Loading product...
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-black text-white">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price (₦)"
                    value={form.price}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                    required
                />
                <input
                    name="brand"
                    placeholder="Brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                </select>
                <select
                    name="concentration"
                    value={form.concentration}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                >
                    <option value="Parfum">Parfum</option>
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Eau de Toilette">Eau de Toilette</option>
                    <option value="Eau de Cologne">Eau de Cologne</option>
                    <option value="Attar">Attar</option>
                    <option value="Body Mist">Body Mist</option>
                </select>
                <input
                    name="sizeML"
                    type="number"
                    placeholder="Size (ml)"
                    value={form.sizeML}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                />
                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                />
                <input
                    name="notes"
                    placeholder="Notes (comma separated)"
                    value={form.notes}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                />
                <select
                    name="longevity"
                    value={form.longevity}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                >
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Long-lasting">Long-lasting</option>
                </select>
                <select
                    name="sillage"
                    value={form.sillage}
                    onChange={handleChange}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                >
                    <option value="Soft">Soft</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Strong">Strong</option>
                </select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="p-2 border border-gray-600 rounded bg-black text-white"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
                >
                    {loading ? "Saving..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;
