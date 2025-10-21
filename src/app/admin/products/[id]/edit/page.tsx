"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../services/api";
import { toast } from "react-hot-toast";

interface ProductForm {
    name: string;
    description: string;
    price: number;
    brand: string;
    category: "Male" | "Female" | "Unisex";
    concentration: "Parfum" | "Eau de Parfum" | "Eau de Toilette" | "Eau de Cologne" | "Attar" | "Body Mist";
    sizeML: number;
    stock: number;
    notes: string;
    longevity: "Light" | "Moderate" | "Long-lasting";
    sillage: "Soft" | "Moderate" | "Strong";
}

const EditProductPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [form, setForm] = useState<ProductForm>({
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                const data = res.data.data;
                setForm({
                    ...data,
                    notes: data.notes?.join(",") || "",
                });
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: ["price", "sizeML", "stock"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === "notes" && typeof value === "string") {
                const cleanedNotes = value
                    .split(",")
                    .map((n: string) => n.trim())
                    .join(",");
                data.append(key, cleanedNotes);
            } else {
                data.append(key, value.toString());
            }
        });

        if (image) data.append("file", image);

        setSaving(true);
        try {
            await api.put(`/products/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Product updated successfully");
            router.push("/admin/products");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update product");
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen p-8 bg-black text-white">
            <h1 className="text-3xl font-bold text-brand-gold mb-6">Edit Product</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" required />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white col-span-full" required />
                <input name="price" type="number" placeholder="Price (₦)" value={form.price} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" required />
                <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" />
                <select name="category" value={form.category} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                </select>
                <select name="concentration" value={form.concentration} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white">
                    <option value="Parfum">Parfum</option>
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Eau de Toilette">Eau de Toilette</option>
                    <option value="Eau de Cologne">Eau de Cologne</option>
                    <option value="Attar">Attar</option>
                    <option value="Body Mist">Body Mist</option>
                </select>
                <input name="sizeML" type="number" placeholder="Size (ml)" value={form.sizeML} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" />
                <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" />
                <input name="notes" placeholder="Notes (comma separated)" value={form.notes} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white" />
                <select name="longevity" value={form.longevity} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white">
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Long-lasting">Long-lasting</option>
                </select>
                <select name="sillage" value={form.sillage} onChange={handleChange} className="p-2 border-2 border-brand-gold rounded bg-black text-white">
                    <option value="Soft">Soft</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Strong">Strong</option>
                </select>

                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="p-2 border-2 border-brand-gold rounded bg-black text-white" />

                <button type="submit" disabled={saving} className="col-span-full py-2 bg-gradient-to-r from-brand-gold to-yellow-400 hover:from-yellow-400 hover:to-brand-gold text-black font-semibold rounded">
                    {saving ? "Saving..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;
