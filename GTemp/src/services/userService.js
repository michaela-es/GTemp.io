const USE_LOCAL_DATA = true;
const mockUserService = {
  register: async (userData) => {
    const response = await fetch("/users.json");
    const users = await response.json();

    if (users.some((u) => u.username === userData.username || u.email === userData.email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: users.length + 1,
      ...userData,
    };

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    storedUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

    return newUser;
  },

  login: async (loginData) => {
    const response = await fetch("/users.json");
    const users = await response.json();

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const allUsers = [...users, ...storedUsers];

    const foundUser = allUsers.find(
      (u) =>
        (u.username === loginData.username || u.email === loginData.username) &&
        u.password === loginData.password
    );

    if (!foundUser) {
      throw new Error("Invalid username or password");
    }

    return {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      token: "local-fake-token",
    };
  },
};

const realUserService = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }
    
    return response.json();
  },

  login: async (loginData) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }
    
    return response.json();
  }
};

export const userService = USE_LOCAL_DATA ? mockUserService : realUserService;