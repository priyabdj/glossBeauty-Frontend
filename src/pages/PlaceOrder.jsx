// import React, { useState, useContext } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/frontend_assets/assets";
// import { ShopContext } from "../context/ShopContext";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const { navigate } = useContext(ShopContext);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!form.email.includes("@")) newErrors.email = "Invalid email address";
//     if (!form.street.trim()) newErrors.street = "Street is required";
//     if (!form.city.trim()) newErrors.city = "City is required";
//     if (!form.state.trim()) newErrors.state = "State is required";
//     if (!form.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
//     if (!form.country.trim()) newErrors.country = "Country is required";
//     if (!form.phone || form.phone.length < 10) newErrors.phone = "Valid phone is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = () => {
//     if (validate()) {
//       navigate("/orders");
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row justify-between gap-8 py-8 px-4 sm:px-6 md:px-10 min-h-[80vh]">
//       {/* Left - Form */}
//       <div className="w-full lg:w-2/3 space-y-4">
//         <Title text1="DELIVERY" text2="INFORMATION" />

//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First name"
//               value={form.firstName}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//           </div>

//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last name"
//               value={form.lastName}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
//           </div>
//         </div>

//         <div className="w-full border border-gray-300 rounded p-2">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border-none outline-none placeholder:text-gray-500"
//           />
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//         </div>

//         <div className="w-full border border-gray-300 rounded p-2">
//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             value={form.street}
//             onChange={handleChange}
//             className="w-full border-none outline-none placeholder:text-gray-500"
//           />
//           {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={form.city}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//           </div>

//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={form.state}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="zipcode"
//               placeholder="Zipcode"
//               value={form.zipcode}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
//           </div>

//           <div className="w-full border border-gray-300 rounded p-2">
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//               className="w-full border-none outline-none placeholder:text-gray-500"
//             />
//             {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
//           </div>
//         </div>

//         <div className="w-full border border-gray-300 rounded p-2">
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border-none outline-none placeholder:text-gray-500"
//           />
//           {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//         </div>
//       </div>

//       {/* Right - Cart and Payment */}
//       <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
//         <CartTotal />

//         <div className="mt-8 space-y-4">
//           <Title text1="PAYMENT" text2="METHOD" />
//           <div className="space-y-3">
//             {["stripe", "razorpay", "cod"].map((type) => (
//               <div
//                 key={type}
//                 className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
//                   method === type ? "border-black" : "border-gray-300"
//                 }`}
//                 onClick={() => setMethod(type)}
//               >
//                 <div className={`w-4 h-4 border rounded-full ${method === type ? "bg-green-500" : ""}`}></div>
//                 {type === "cod" ? (
//                   <p className="text-sm text-gray-600">CASH ON DELIVERY</p>
//                 ) : (
//                   <img
//                     src={type === "stripe" ? assets.stripe_logo : assets.razorpay_logo}
//                     alt={type}
//                     className="h-5 ml-4"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="w-full text-end mt-6">
//           <button
//             className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition text-sm"
//             onClick={handlePlaceOrder}
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;


import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("/auth/profile");
        if (!res.data.success) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkLogin();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email address";
    if (!form.street.trim()) newErrors.street = "Street is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.phone || form.phone.length < 10) newErrors.phone = "Valid phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validate()) {
      // You can also send this form to backend via axiosInstance.post(...)
      navigate("/orders");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 py-8 px-4 sm:px-6 md:px-10 min-h-[80vh]">
      {/* Left - Form */}
      <div className="w-full lg:w-2/3 space-y-4">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="flex flex-col sm:flex-row gap-4">
          <InputField name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
          <InputField name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
        </div>

        <InputField name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
        <InputField name="street" value={form.street} onChange={handleChange} error={errors.street} />

        <div className="flex flex-col sm:flex-row gap-4">
          <InputField name="city" value={form.city} onChange={handleChange} error={errors.city} />
          <InputField name="state" value={form.state} onChange={handleChange} error={errors.state} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <InputField name="zipcode" value={form.zipcode} onChange={handleChange} error={errors.zipcode} />
          <InputField name="country" value={form.country} onChange={handleChange} error={errors.country} />
        </div>

        <InputField name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} />
      </div>

      {/* Right - Cart & Payment */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
        <CartTotal />

        <div className="mt-8 space-y-4">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="space-y-3">
            {["stripe", "razorpay", "cod"].map((type) => (
              <div
                key={type}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
                  method === type ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMethod(type)}
              >
                <div
                  className={`w-4 h-4 border rounded-full ${
                    method === type ? "bg-green-500" : ""
                  }`}
                ></div>
                {type === "cod" ? (
                  <p className="text-sm text-gray-600">CASH ON DELIVERY</p>
                ) : (
                  <img
                    src={type === "stripe" ? assets.stripe_logo : assets.razorpay_logo}
                    alt={type}
                    className="h-5 ml-4"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-end mt-6">
          <button
            className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition text-sm"
            onClick={handlePlaceOrder}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable InputField component for cleaner code
const InputField = ({ name, value, onChange, error, type = "text" }) => (
  <div className="w-full border border-gray-300 rounded p-2">
    <input
      type={type}
      name={name}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
      value={value}
      onChange={onChange}
      className="w-full border-none outline-none placeholder:text-gray-500"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default PlaceOrder;
