import { apiTodosRoute, apiUsersRoute } from '../utils/constants';

const todosApi = {
  async fetch() {
    try {
      const res = await fetch(apiTodosRoute, {
        credentials: 'include',
      });

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async add(name) {
    try {
      name = name.trim();
      if (!name) {
        return;
      }

      const res = await fetch(apiTodosRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
        credentials: 'include',
      });

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async delete(id) {
    try {
      const res = await fetch(apiTodosRoute + id, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error in the request');
      }

      return res;
    } catch (error) {
      return { error: error.message };
    }
  },

  async edit(id, name, description, priority) {
    try {
      name = name.trim();
      if (!name) {
        setEditingTodoId(null);
        return;
      }

      const res = await fetch(apiTodosRoute + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          priority: priority,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error in the request');
      }

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async check(id, isCompleted) {
    try {
      const res = await fetch(apiTodosRoute + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !isCompleted }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error in the request');
      }
      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(apiUsersRoute + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include',
      });

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async signup(name, email, password, passwordConfirm) {
    try {
      const res = await fetch(apiUsersRoute + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
        credentials: 'include',
      });

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  async logout() {
    try {
      const res = await fetch(apiUsersRoute + 'logout', {
        method: 'POST',
        credentials: 'include',
      });

      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  },
};

export default todosApi;
