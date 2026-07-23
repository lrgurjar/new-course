import { useState } from "react";
import { Fragment } from "react";
import { ProductList } from "./components/ProductList";
import { ProductCard } from "./components/ProductCard";
import { ProductFilter } from "./components/ProductFilter";
import { products as productsData } from "./data/products";
import styles from "./App.module.css";
import Virtualization from "./components/interview/Virtulation";
import Accordion from "./components/interview/Accordian";
import { Tabs } from "./components/interview/Tab";
import Modal from "./components/interview/Modal";
import ModalPortal from "./components/interview/ModalPortal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: "other value",
  });
  const [favorites, setFavorites] = useState([]);

  function handlePurchase(productId, stockCount) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, stockCount } : product
      )
    );
  }

  function handleFilter(key, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        [key]: value,
      },
    }));
  }

  function handleFavorite(productId) {
    if (favorites.includes(productId)) {
      setFavorites((prevFavotites) =>
        prevFavotites.filter((id) => id !== productId)
      );
    } else {
      setFavorites((prevFavotites) => [...prevFavotites, productId]);
    }
  }

  return (
    <div className={styles.App}>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <ModalPortal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome Modal"
      >
        <p>This modal is rendered safely at the root level using React Portals!</p>
      </ModalPortal>

      {/* <button
        onClick={() => setIsModalOpen(true)}
        style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
      >
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome Dialog"
      >
        <p>This is a highly flexible, reusable modal container.</p>
        <p>You can embed forms, images, or any other elements here.</p>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Understood
        </button>
      </Modal> */}

      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Tab value="account" style={{ color: "#fff" }}>Account</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="account">
          <h3>Account Information</h3>
          <p>Update your public profile and login email here.</p>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <h3>Security Details</h3>
          <p>Manage your password modifications and two-factor setups.</p>
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <h3 >Notification Choices</h3>
          <p>Control what emails and push notifications you want to receive.</p>
        </Tabs.Panel>
      </Tabs>

      <Accordion defaultIndex={0}>
        <Accordion.Item index={0}>
          <Accordion.Header index={0}>Section 1: General Info</Accordion.Header>
          <Accordion.Panel index={0}>
            <p>This is the content for section 1.</p>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item index={1}>
          <Accordion.Header index={1}>Section 2: Pricing Details</Accordion.Header>
          <Accordion.Panel index={1}>
            <p>This is the content for section 2.</p>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Virtualization />
      {/* <Parent /> */}

      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onPurchase={handlePurchase}
            onFavorite={handleFavorite}
          />
        ))}
      </ProductList>

      <h2>Products filtered by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter} />
      {products
        .filter(
          ({ price }) =>
            price >= filters.price.min && price <= filters.price.max
        )
        .map(({ title, price }) => (
          <Fragment key={title}>
            <hr className={styles.ListDivider} />
            <p className={styles.ListTitle}>
              {title} cost ${price}
            </p>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
