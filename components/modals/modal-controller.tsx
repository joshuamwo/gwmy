import { createContext, useContext, useReducer } from "react";
import { Dispatch } from "react";

interface ModalState {
  view: string | undefined;
  isOpen?: boolean;
  data?: any;
}

const initialState: ModalState = {
  view: undefined,
  isOpen: false,
  data: undefined,
};

type Action =
  | { type: "open"; view: MODAL_VIEWS; payload?: any }
  | { type: "close" };

export type MODAL_VIEWS =
  | "AUTHFORM"
  | "CHECKOUT"
  | "FORGOT_PASSWORD"
  | "RESET_PASSWORD"
  | "SUCCESS"
  | "ERROR"
  | "PAYMENT";

const ModalContext = createContext<ModalState>(initialState);
const ModalActionContext = createContext<Dispatch<Action> | undefined>(
  undefined
);
ModalActionContext.displayName = "ModalActionContext";

function modalReducer(state: ModalState, action: Action): ModalState {
  switch (action.type) {
    case "open":
      return {
        ...state,
        view: action.view,
        isOpen: true,
        data: action.payload,
      };
    case "close":
      return {
        ...state,
        view: undefined,
        isOpen: false,
        data: undefined,
      };
    default:
      throw new Error("Unknown Modal Action!");
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={modalState}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalContext.Provider>
  );
}

export const useModalState = () => {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  }
  return modalContext;
};

export function useModalAction() {
  const dispatch = useContext(ModalActionContext);

  if (dispatch === undefined) {
    throw new Error(
      "useModalAction must be used within a ModalActionContextProvider"
    );
  }

  return {
    openModal(view: MODAL_VIEWS, payload?: any) {
      dispatch({ type: "open", view, payload });
    },

    closeModal() {
      dispatch({ type: "close" });
    },
  };
}
