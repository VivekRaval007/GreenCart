import {
  FiGrid, FiPackage, FiTruck, FiShoppingCart, FiBarChart2, FiUsers,
  FiClipboard, FiLifeBuoy, FiSettings, FiShoppingBag, FiStar, FiArchive,
  FiUser, FiBell, FiCreditCard, FiDollarSign, FiMessageSquare,
} from "react-icons/fi";

export const navConfig = {
  farmer: [
    { label: "Dashboard", path: "/farmer", icon: FiGrid, end: true },
    { label: "My Listings", path: "/farmer/listings", icon: FiPackage },
    { label: "Inventory", path: "/farmer/inventory", icon: FiArchive },
    { label: "Orders", path: "/farmer/orders", icon: FiClipboard },
    { label: "Sales & Earnings", path: "/farmer/sales", icon: FiBarChart2 },
    { label: "Reviews & Ratings", path: "/farmer/reviews", icon: FiStar },
    { label: "Notifications", path: "/farmer/notifications", icon: FiBell },
    { label: "Profile", path: "/farmer/profile", icon: FiUser },
  ],
  dealer: [
    { label: "Dashboard", path: "/dealer", icon: FiGrid, end: true },
    { label: "Browse Produce", path: "/dealer/browse", icon: FiShoppingBag },
    { label: "My Products", path: "/dealer/products", icon: FiPackage },
    { label: "Inventory & Stock", path: "/dealer/inventory", icon: FiArchive },
    { label: "Purchase Management", path: "/dealer/purchases", icon: FiClipboard },
    { label: "Sales & Revenue", path: "/dealer/sales", icon: FiBarChart2 },
    { label: "Transactions & Payments", path: "/dealer/transactions", icon: FiCreditCard },
    { label: "Profile", path: "/dealer/profile", icon: FiUser },
  ],
  customer: [
    { label: "Browse Products", path: "/customer", icon: FiGrid, end: true },
    { label: "Cart & Checkout", path: "/customer/cart", icon: FiShoppingCart },
    { label: "My Orders", path: "/customer/orders", icon: FiClipboard },
    { label: "Track Delivery", path: "/customer/track", icon: FiTruck },
    { label: "Profile", path: "/customer/profile", icon: FiUser },
  ],
  delivery: [
    { label: "Dashboard", path: "/delivery", icon: FiGrid, end: true },
    { label: "Assigned Deliveries", path: "/delivery/assigned", icon: FiTruck },
    { label: "Delivery History", path: "/delivery/history", icon: FiClipboard },
    { label: "Earnings", path: "/delivery/earnings", icon: FiDollarSign },
    { label: "Profile", path: "/delivery/profile", icon: FiUser },
  ],
  support: [
    { label: "Dashboard", path: "/support", icon: FiGrid, end: true },
    { label: "Ticket Management", path: "/support/queries", icon: FiLifeBuoy },
    { label: "Ticket Records", path: "/support/records", icon: FiClipboard },
    { label: "Feedback", path: "/support/feedback", icon: FiMessageSquare },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: FiGrid, end: true },
    { label: "User Management", path: "/admin/users", icon: FiUsers },
    { label: "Farmer Management", path: "/admin/farmers", icon: FiPackage },
    { label: "Dealer Management", path: "/admin/dealers", icon: FiShoppingBag },
    { label: "Product Management", path: "/admin/products", icon: FiArchive },
    { label: "Order Management", path: "/admin/orders", icon: FiClipboard },
    { label: "Payment & Revenue", path: "/admin/payments", icon: FiDollarSign },
    { label: "Reports & Analytics", path: "/admin/reports", icon: FiBarChart2 },
    { label: "Support Management", path: "/admin/support", icon: FiLifeBuoy },
    { label: "Settings", path: "/admin/settings", icon: FiSettings },
  ],
};

export const roleMeta = {
  farmer: { label: "Farmer", color: "var(--role-farmer)" },
  dealer: { label: "Dealer", color: "var(--role-dealer)" },
  customer: { label: "Customer", color: "var(--role-customer)" },
  delivery: { label: "Delivery", color: "var(--role-delivery)" },
  support: { label: "Support Staff", color: "var(--role-support)" },
  admin: { label: "Administrator", color: "var(--role-admin)" },
};
