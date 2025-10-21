"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { Trash2, Edit, MapPin, Package, CreditCard, Heart } from "lucide-react";
import Link from "next/link";

interface IUserAddress {
  _id?: string;
  fullName?: string;
  street: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  landmark?: string;
  phone?: string;
  isDefault?: boolean;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  addresses?: IUserAddress[];
}

interface IQuickLink {
  title: string;
  href: string;
  icon: React.ReactNode;
  bgColor?: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [newAddress, setNewAddress] = useState<IUserAddress>({
    street: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  const cardStyle = {
    backgroundColor: "#111111",
    border: "1px solid #2A2A2A",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "12px",
  };

  const buttonStyle = {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    transition: "all 0.2s ease",
  };

  const quickLinks: IQuickLink[] = [
    { title: "My Orders", href: "/orders", icon: <Package size={20} />, bgColor: "#222222" },
    { title: "Payment Methods", href: "/coming-soon", icon: <CreditCard size={20} />, bgColor: "#222222" },
    { title: "Wishlist", href: "/coming-soon", icon: <Heart size={20} />, bgColor: "#222222" },
  ];

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/v1/users/profile");
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Add address
  const addAddress = async () => {
    try {
      const res = await api.post("/api/v1/users/addresses", newAddress);
      setProfile((prev) =>
        prev ? { ...prev, addresses: res.data.addresses } : prev
      );
      setNewAddress({ street: "", city: "", state: "", country: "Nigeria" });
    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  // Delete address
  const deleteAddress = async (addressId: string) => {
    try {
      const res = await api.delete(`/api/v1/users/addresses/${addressId}`);
      setProfile((prev) =>
        prev ? { ...prev, addresses: res.data.addresses } : prev
      );
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  // Edit address
  const editAddress = async (addressId: string) => {
    const address = profile?.addresses?.find(a => a._id === addressId);
    if (!address) return;

    const newStreet = prompt("Enter new street", address.street);
    if (!newStreet) return;

    try {
      const updatedAddr = { ...address, street: newStreet };
      const res = await api.put(`/api/v1/users/addresses/${addressId}`, updatedAddr);
      setProfile((prev) =>
        prev ? { ...prev, addresses: res.data.addresses } : prev
      );
    } catch (err) {
      console.error("Failed to edit address", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid relative flex items-center justify-center">
          <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-xs">Spray n Sniff</span>
        </div>
        <span className="mt-4 text-xl text-white tracking-wide">Loading profile...</span>
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No profile found
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-black text-white font-sans text-[12px] space-y-6">
      {/* Profile Header */}
      <div style={cardStyle} className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px]" style={{ backgroundColor: "#2A2A2A" }}>
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-sm font-semibold">{profile.name}</h1>
            <p className="text-xs opacity-70">{profile.email}</p>
          </div>
        </div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition text-[12px]"
        >
          Logout
        </button>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.title} href={link.href} className="flex items-center gap-2 p-4 rounded-lg border border-yellow-500/30 hover:shadow-lg transition" style={{ backgroundColor: link.bgColor }}>
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </div>

      <div className="border-b border-[#2A2A2A] my-4" />

      {/* Address Section */}
      <h2 className="text-sm font-semibold mb-2">Saved Addresses</h2>
      <div style={cardStyle} className="mb-4">
        {profile.addresses && profile.addresses.length > 0 ? (
          <ul className="space-y-1">
            {profile.addresses.map((addr) => (
              <li key={addr._id} className="p-2 rounded flex justify-between items-center" style={{ backgroundColor: "#1A1A1A" }}>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <p className="text-[12px]">
                    {addr.street}, {addr.city}, {addr.state}, {addr.country || "Nigeria"}
                  </p>
                  {addr.isDefault && (
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ backgroundColor: "#CDA23B", color: "#0A0A0A" }}>
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => editAddress(addr._id!)} className="p-1 bg-white/10 rounded hover:bg-white/20">
                    <Edit size={12} />
                  </button>
                  <button onClick={() => deleteAddress(addr._id!)} className="p-1 bg-white/10 rounded hover:bg-white/20">
                    <Trash2 size={12} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ opacity: 0.6 }}>No addresses saved yet</p>
        )}
      </div>

      {/* Add Address Form */}
      <h2 className="text-sm font-semibold mb-2">Add New Address</h2>
      <div style={cardStyle} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {["street", "city", "state", "phone"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(newAddress as any)[field] || ""}
              onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
              className="p-2 rounded text-[12px]"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#FFFFFF" }}
            />
          ))}
        </div>
        <button onClick={addAddress} style={buttonStyle} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
          + Add Address
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-lg w-72 text-center text-[12px]">
            <p className="mb-3">Are you sure you want to logout?</p>
            <div className="flex justify-between gap-2">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded">
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
