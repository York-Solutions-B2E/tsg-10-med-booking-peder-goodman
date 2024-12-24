// to setup the hook
import { useState } from "react";

export function useCustomModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // this allows you to use destructuring when calling the hook (see below)
  return [isOpen, openModal, closeModal] as const;
}
