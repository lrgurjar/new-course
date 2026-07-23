import { useState } from "react";
import Virtualization from "./components/interview/Virtualization";
import Accordion from "./components/interview/Accordion";
import { Tabs } from "./components/interview/Tab";
import ModalPortal from "./components/interview/ModalPortal";
import ProductWrapper from "./components/ProductWrapper";
import ToDoList from "./components/todoList/ToDoList";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div style={{
      maxWidth: "960px",
      margin: "0 auto",
      padding: "64px 16px 16px"
    }}>
      <ToDoList />
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <ModalPortal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome Modal"
      >
        <p>This modal is rendered safely at the root level using React Portals!</p>
      </ModalPortal>
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
      <ProductWrapper />
    </div >
  );
}

export default App;

