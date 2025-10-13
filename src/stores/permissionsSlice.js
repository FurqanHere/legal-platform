// stores/permissionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadPermissionsFromStorage = () => {
  try {
    const stored = localStorage.getItem('permissions');
    return (stored && stored!='undefined') ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load permissions from localStorage:', error);
    return [];
  }
};

const savePermissionsToStorage = (permissions) => {
  try {
    console.log(permissions);
    localStorage.setItem('permissions', JSON.stringify(permissions));
  } catch (error) {
    console.error('Failed to save permissions to localStorage:', error);
  }
};

// Initial state from localStorage
const initialState = {
  permissions: loadPermissionsFromStorage(),
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    // Set permissions from an array (with localStorage sync)
    setPermissions: (state, action) => {
      state.permissions = action.payload;
      savePermissionsToStorage(action.payload);
    },
    // Add a single permission (with localStorage sync)
    addPermission: (state, action) => {
      const permission = action.payload;
      if (!state.permissions.includes(permission)) {
        state.permissions.push(permission);
        savePermissionsToStorage(state.permissions);
      }
    },
    // Remove a single permission (with localStorage sync)
    removePermission: (state, action) => {
      state.permissions = state.permissions.filter(
        (perm) => perm !== action.payload
      );
      savePermissionsToStorage(state.permissions);
    },
    // Clear all permissions (with localStorage sync)
    clearPermissions: (state) => {
      state.permissions = [];
      localStorage.removeItem('permissions');
    },
  },
});

// Export actions
export const {
  setPermissions,
  addPermission,
  removePermission,
  clearPermissions,
} = permissionsSlice.actions;

// NEW: Export selector to get permissions (for direct access without Redux)
export const selectStoredPermissions = () => loadPermissionsFromStorage();

// Export reducer
export default permissionsSlice.reducer;