import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
// import { apiAddress } from "../config";
import { checkAuth, setAuth } from "../utils/auth";
import { IHospitalityVenue, ITable, IWaiter } from "../types/venueType";
import { removeSelectedVenueLS } from "../utils/hospitalityVenue";
import { createError } from "../utils/createError";

// Interfaces
interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  role: "MANAGER" | "ADMIN";
}

interface ITableData {
  name: string;
  hospitalityVenueId: string;
  users: string[];
  messages: string[];
  disabledCategories: string[];
}

interface IUpdateTableData {
  id: string;
  hospitalityVenueId: string;
  users: string[];
  messages: string[];
  disabledCategories: string[];
}

interface IUpdateWaiterData {
  tables: string[];
  waiterId: string;
}

interface IWaitedData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  tables: string[];
}

interface IUpdateCategoryData {
  id: string;
  name: string;
}

interface IStorageContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  isScreenLoading: boolean;
  hospitalityVenues: IHospitalityVenue[];
  userData: IUser;
  selectedVenue?: IHospitalityVenue;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSelectedVenue: (venue: IHospitalityVenue) => void;
  addMessage: (messageText: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  addTable: (data: ITableData) => Promise<void>;
  deleteTable: (tableId: string) => Promise<void>;
  addWaiter: (data: IWaitedData) => Promise<void>;
  deleteWaiter: (waiterId: string) => Promise<void>;
  changeTable: (data: IUpdateTableData) => Promise<void>;
  changeWaiterTables: (data: IUpdateWaiterData) => Promise<void>;
  editCategoryName: (data: IUpdateCategoryData) => Promise<void>;
  deleteArticleCategory: (categoryId: string) => Promise<void>;
}

// Initial State
const initialState: IStorageContext = {
  isAuthenticated: false,
  isLoading: false,
  isScreenLoading: false,
  hospitalityVenues: [],
  userData: { email: "", firstName: "", lastName: "", role: "MANAGER" },
  selectedVenue: undefined,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  setSelectedVenue: (venue: IHospitalityVenue) => {},
  addMessage: async (messageText: string) => {},
  deleteMessage: async (messageId: string) => {},
  addTable: async (data: ITableData) => {},
  deleteTable: async (tableId: string) => {},
  addWaiter: async (data: IWaitedData) => {},
  deleteWaiter: async (waiterId: string) => {},
  changeTable: async (data: IUpdateTableData) => {},
  changeWaiterTables: async (data: IUpdateWaiterData) => {},
  editCategoryName: async (data: IUpdateCategoryData) => {},
  deleteArticleCategory: async (categoryId: string) => {},
};

// Context
const StorageContext = createContext<IStorageContext>(initialState);

// Provider
const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userData, setUserData] = useState<IUser>(initialState.userData);
  const [hospitalityVenues, setHospitalityVenues] = useState<
    IHospitalityVenue[]
  >([]);
  const [selectedVenue, setSelectedVenue] = useState<IHospitalityVenue>();
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getVenues();
    }
  }, [isAuthenticated]);

  const setAuthentication = (authentication: boolean) => {
    setIsAuthenticated(authentication);
    setAuth(authentication ? "true" : "false");
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/auth/sign-in`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setAuthentication(true);
      setUserData(response.data);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const logout = async () => {
    try {
      setIsScreenLoading(true);
      await axios.post(
        `${apiAddress}/auth/sign-out`,
        {},
        { withCredentials: true }
      );
      setAuthentication(false);
      setUserData(initialState.userData);
      setHospitalityVenues([]);
      removeSelectedVenueLS();
      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const getVenues = async () => {
    try {
      setIsScreenLoading(true);
      const response = await axios.get(`${apiAddress}/hospitality-venue/all`, {
        withCredentials: true,
      });

      setIsScreenLoading(false);
      setHospitalityVenues(response.data);
    } catch (error) {
      setIsScreenLoading(false);
      const e = createError(error);
      if (e.message === "User is logged out.") {
        setAuthentication(false);
        setUserData(initialState.userData);
        setHospitalityVenues([]);
        removeSelectedVenueLS();
        return window.location.reload();
      }
    }
  };

  const addMessage = async (messageText: string) => {
    try {
      const tables = selectedVenue!.tables.map((table) => table.id);
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/messages/add`,
        {
          message: messageText,
          hospitalityVenueId: selectedVenue?.id,
          tables,
          isPriority: false,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const newMessage = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            messages: [
              ...prev.messages,
              { message: newMessage.message, id: newMessage.id },
            ],
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${apiAddress}/messages/${messageId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });
      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            messages: prev.messages.filter(
              (message) => message.id !== messageId
            ),
          };
        }
        return prev;
      });
      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const addTable = async (data: ITableData) => {
    try {
      setIsScreenLoading(true);
      const response = await axios.post(`${apiAddress}/table/add`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const newTable: ITable = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: [...prev.tables, newTable],
          };
        }
        return prev;
      });

      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const deleteTable = async (tableId: string) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${apiAddress}/table/${tableId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: prev.tables.filter((table) => table.id !== tableId),
          };
        }
        return prev;
      });
      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const addWaiter = async (data: IWaitedData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiAddress}/auth/signup`,
        {
          ...data,
          role: "WAITER",
          hospitalityVenues: [selectedVenue!.id],
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newWaiter = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: [...prev.users, newWaiter],
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const deleteWaiter = async (waiterId: string) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${apiAddress}/user/${waiterId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: prev.users.filter((user) => user.id !== waiterId),
          };
        }
        return prev;
      });

      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const changeTable = async (data: IUpdateTableData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`${apiAddress}/table/${data.id}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const updatedTable: ITable = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: prev.tables.map((table) =>
              table.id === data.id ? updatedTable : table
            ),
            users: prev.users.map((user) => {
              if (data.users.includes(user.id)) {
                const currUserTables = user.tables.map((table) => table.id);
                if (!currUserTables.includes(data.id)) {
                  user.tables.push({ id: data.id });
                }
              } else {
                user.tables = user.tables.filter(
                  (table) => table.id !== data.id
                );
              }
              return user;
            }),
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const changeWaiterTables = async (data: IUpdateWaiterData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/user/connect-table`,
        {
          tables: data.tables,
          hospitalityVenueId: selectedVenue!.id,
          userId: data.waiterId,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedWaiter: IWaiter = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: prev.users.map((user) =>
              user.id === updatedWaiter.id ? updatedWaiter : user
            ),
            tables: prev.tables.map((table) => {
              if (data.tables.includes(table.id)) {
                const currTableWaiters = table.users.map((user) => user.id);
                if (!currTableWaiters.includes(data.waiterId)) {
                  table.users.push({ id: data.waiterId });
                }
              } else {
                table.users = table.users.filter(
                  (user) => user.id !== data.waiterId
                );
              }
              return table;
            }),
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const editCategoryName = async ({ id, name }: IUpdateCategoryData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiAddress}/article-category/update/${id}`,
        { name, hospitalityVenueId: selectedVenue!.id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedCategory = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            categories: prev.categories.map((category) =>
              category.id === id ? updatedCategory : category
            ),
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const deleteArticleCategory = async (categoryId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${apiAddress}/article-category/${categoryId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            categories: prev.categories.filter(
              (category) => category.id !== categoryId
            ),
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        isAuthenticated,
        hospitalityVenues,
        userData,
        selectedVenue,
        isLoading,
        isScreenLoading,
        login,
        logout,
        setSelectedVenue,
        addMessage,
        deleteMessage,
        addTable,
        deleteTable,
        addWaiter,
        deleteWaiter,
        changeTable,
        changeWaiterTables,
        editCategoryName,
        deleteArticleCategory,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
