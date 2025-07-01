import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

const OrderDetails = () => {
  const { currency } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      
      if (!userEmail) {
        navigate('/login')
        return
      }
      
      const response = await axiosInstance.get(`/orders?userEmail=${userEmail}`)
      
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    const statusColors = {
      'Order Placed': 'bg-blue-500',
      'Processing': 'bg-yellow-500',
      'Shipped': 'bg-orange-500',
      'Out for Delivery': 'bg-purple-500',
      'Delivered': 'bg-green-500',
      'Cancelled': 'bg-red-500'
    }
    return statusColors[status] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className='flex justify-center items-center py-10'>
          <p className='text-gray-500'>Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orders.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-10'>
            <p className='text-gray-500 text-lg mb-4'>No orders found</p>
            <button 
              onClick={() => navigate('/collection')}
              className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className='mb-6 border rounded-lg p-4 bg-gray-50'>
              {/* Order Header */}
              <div className='flex justify-between items-center mb-4 pb-2 border-b'>
                <div>
                  <p className='font-medium'>Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className='text-sm text-gray-500'>
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>Total: {currency}{order.totalAmount + order.deliveryFee}</p>
                  <p className='text-sm text-gray-500 capitalize'>{order.paymentMethod}</p>
                </div>
              </div>

              {/* Order Items */}
              {order.items.map((item, index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img src={item.image} alt={item.name} className='w-16 sm:w-20' />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>

                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className={`min-w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></p>
                      <p className='text-sm md:text-base'>{order.status}</p>
                    </div>
                    <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition'>
                      Track Order
                    </button>
                  </div>
                </div>
              ))}

              {/* Shipping Info */}
              <div className='mt-4 p-3 bg-white rounded border'>
                <p className='font-medium mb-2'>Shipping Address:</p>
                <p className='text-sm text-gray-600'>
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br/>
                  {order.shippingInfo.street}<br/>
                  {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipcode}<br/>
                  {order.shippingInfo.country}<br/>
                  Phone: {order.shippingInfo.phone}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderDetails