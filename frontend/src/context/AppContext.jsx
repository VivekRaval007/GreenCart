import { createContext, useContext, useMemo, useState } from "react";
import { demoUsers, initialOrders, initialProducts, initialTickets } from "../data/mockData";

const AppContext = createContext(null);

let idCounter = 100;
const nextId = (prefix) => `${prefix}${idCounter++}`;

export function AppProvider({ children }) {
  const [users, setUsers] = useState(demoUsers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [tickets, setTickets] = useState(initialTickets);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  // ---- Auth ----
  function login(email, password) {
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (match) {
      setCurrentUser(match);
      return { ok: true, user: match };
    }
    return { ok: false, error: "Invalid email or password." };
  }

  function register({ name, email, password, role, location }) {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "An account with this email already exists." };
    const newUser = { id: nextId("u"), name, email, password, role, location: location || "" };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true, user: newUser };
  }

  function logout() {
    setCurrentUser(null);
    setCart([]);
  }

  // ---- Products (Farmer) ----
  function addProduct(product) {
    setProducts((prev) => [{ ...product, id: nextId("p") }, ...prev]);
  }
  function updateProduct(id, changes) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // ---- Cart (Customer) ----
  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty }];
    });
  }
  function updateCartQty(productId, qty) {
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  }
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }
  function clearCart() {
    setCart([]);
  }

  // ---- Orders ----
  function placeOrder({ items, buyer, buyerRole, farmerId, paymentMethod = "Card" }) {
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = {
      id: nextId("o"),
      buyerId: buyer.id,
      buyerName: buyer.name,
      buyerRole,
      items,
      total,
      status: "Processing",
      date: new Date().toISOString().slice(0, 10),
      deliveryPersonId: null,
      farmerId: farmerId || null,
      review: null,
      paymentMethod,
      paymentStatus: paymentMethod === "Cash on delivery" ? "Pending" : "Paid",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }
  function updateOrderStatus(id, status, extra = {}) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status, ...extra, paymentStatus: status === "Delivered" ? "Paid" : o.paymentStatus }
          : o
      )
    );
  }
  function confirmOrder(id) {
    // Farmer confirms a Processing order is ready to be picked up for delivery.
    updateOrderStatus(id, "Ready for pickup");
  }
  function cancelOrder(id) {
    updateOrderStatus(id, "Cancelled");
  }
  function addReview(orderId, review) {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, review } : o)));
  }

  // ---- Profile ----
  function updateProfile(changes) {
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, ...changes } : u)));
    setCurrentUser((prev) => ({ ...prev, ...changes }));
  }

  // ---- Support tickets ----
  function addTicket(ticket) {
    const newTicket = { ...ticket, id: nextId("t"), status: "Open", response: "" };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  }
  function updateTicket(id, changes) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  }

  // ---- Admin: users ----
  function setUserStatus(id, status) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  }
  function deleteUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  const value = useMemo(
    () => ({
      users,
      products,
      orders,
      tickets,
      currentUser,
      cart,
      login,
      register,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      confirmOrder,
      cancelOrder,
      addReview,
      updateProfile,
      addTicket,
      updateTicket,
      setUserStatus,
      deleteUser,
    }),
    [users, products, orders, tickets, currentUser, cart]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
