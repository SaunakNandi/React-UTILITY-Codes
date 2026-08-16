import { createContext, useContext, useState, type ReactNode } from "react";

type AccordionContextType = {
  openItem: string | null;
  toggleItem: (id: string) => void;
};
const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Error at Accrodion");
  return context;
};

const AccordionItemContext = createContext<string | null>(null);

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("Error at accordion item");
  return context;
};

export const Accordion = ({
  children,
  defaultOpen = null,
}: {
  children: ReactNode;
  defaultOpen: string | null;
}) => {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen);
  const toggleItem = (id: string) =>
    setOpenItem((prev) => (prev === id ? null : id));
  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="accordion-root">{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.item = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className="accordion-item" data-value={value}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

Accordion.header = function AccordionHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { toggleItem } = useAccordion();
  const item = useAccordionItem();
  return <button onClick={() => toggleItem(item)}>{children}</button>;
};

Accordion.body = function AccordionBody({ children }: { children: ReactNode }) {
  const { openItem } = useAccordion();
  const item = useAccordionItem();
  if (openItem !== item) return null;
  return <div className="accordion-body">{children}</div>;
};
