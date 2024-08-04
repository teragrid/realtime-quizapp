const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

dotenv.config();

const getUserByUserName = async (token, username) => {
  const config = {
    method: 'get',
    url: `${process.env.SERVER_URL_KEYCLOAK}/admin/realms/${process.env.REALM_KEYCLOAK}/users?username=${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await axios(config);
  return result?.data[0];
};

const getAccessToken = async (
  keycloakClientId,
  keycloakClientSecret,
  username,
  password,
  type = false,
) => {
  try {
    const data = qs.stringify({
      grant_type: 'password',
      client_id: keycloakClientId,
      client_secret: keycloakClientSecret,
      username,
      password,
    });

    const config = {
      method: 'post',
      url: `${process.env.SERVER_URL_KEYCLOAK}/realms/${process.env.REALM_KEYCLOAK}/protocol/openid-connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    const result = await axios(config);

    if (type) {
      return {
        access_token: result.data.access_token,
        expires_in: result.data.expires_in,
        refresh_token: result.data.refresh_token,
        refresh_expires_in: result.data.refresh_expires_in,
      };
    }

    return result.data.access_token;
  } catch (error) {
    return false;
  }
};

const updatePassword = async (
  userId,
  token,
  newPassword,
) => {
  try {
    const data = {
      type: 'password',
      value: newPassword,
      temporary: 'false',
    };

    const config = {
      method: 'put',
      url: `${process.env.SERVER_URL_KEYCLOAK}/admin/realms/${process.env.REALM_KEYCLOAK}/users/${userId}/reset-password`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    const result = await axios(config);
    return result?.status === StatusCodes.NO_CONTENT;
  } catch (error) {
    console.log('[updatePassword] Error', error);
    return false;
  }
};

const getAccessTokenByRefreshToken = async (
  keycloakClientId,
  keycloakClientSecret,
  refreshToken,
) => {
  try {
    const data = qs.stringify({
      grant_type: 'refresh_token',
      client_id: keycloakClientId,
      client_secret: keycloakClientSecret,
      refresh_token: refreshToken,
    });

    const config = {
      method: 'post',
      url: `${process.env.SERVER_URL_KEYCLOAK}/realms/${process.env.REALM_KEYCLOAK}/protocol/openid-connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    const result = await axios(config);

    return {
      access_token: result.data.access_token,
      expires_in: result.data.expires_in,
      refresh_token: result.data.refresh_token,
      refresh_expires_in: result.data.refresh_expires_in,
    };
  } catch (error) {
    return false;
  }
};

const createUserKeyCloak = async (
  clientId,
  clientSecret,
  adminUsername,
  adminPassword,
  username,
  password,
) => {
  try {
    const accessTokenAdmin = await getAccessToken(
      clientId,
      clientSecret,
      adminUsername,
      adminPassword,
    );
    const data = JSON.stringify({
      enabled: true,
      emailVerified: '',
      username,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    });

    const headers = {
      Authorization: `Bearer ${accessTokenAdmin}`,
      'Content-Type': 'application/json',
    };

    const config = {
      method: 'post',
      url: `${process.env.SERVER_URL_KEYCLOAK}/admin/realms/${process.env.REALM_KEYCLOAK}/users`,
      headers,
      data,
    };

    await axios(config);
    return true;
  } catch (error) {
    if (error.response.status === 409) {
      return true;
    }

    console.log('[Keycloak Error][createUserKeyCloak] Err ', error);

    return false;
  }
};

const deleteUser = async (
  userId,
  token,
) => {
  try {
    const config = {
      method: 'delete',
      url: `${process.env.SERVER_URL_KEYCLOAK}/admin/realms/${process.env.REALM_KEYCLOAK}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const result = await axios(config);
    return result?.status === StatusCodes.OK || result?.status === StatusCodes.NO_CONTENT;
  } catch (error) {
    console.log('[deleteUser] Error', error);
    return false;
  }
};

const getUserId = async (access_token) => {
  try {
    const config = {
      method: 'get',
      url: `${process.env.SERVER_URL_KEYCLOAK}/realms/${process.env.REALM_KEYCLOAK}/protocol/openid-connect/userinfo`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const result = await axios(config);
    return result.data.sub;
  } catch (error) {
    console.log('[Keycloak Error][GetUserKeyCloak] Err');
    return false;
  }
};

const addRoleToAdmin = async (userId, accessToken) => {
  try {
    const data = JSON.stringify([
      {
        id: process.env.ROLE_ID_ADMIN_KEYCLOAK,
        name: process.env.ROLE_NAME_ADMIN_KEYCLOAK,
      },
    ]);

    const config = {
      method: 'post',
      url: `${process.env.SERVER_URL_KEYCLOAK}/admin/realms/${process.env.REALM_KEYCLOAK}/users/${userId}/role-mappings/realm`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    await axios(config);
  } catch (error) {
    console.log('[Keycloak Error][addRoleToAdmin] Err ');
  }
};

const getUserInfo = async (access_token) => {
  const config = {
    method: 'get',
    url: `${process.env.SERVER_URL_KEYCLOAK}/realms/${process.env.REALM_KEYCLOAK}/protocol/openid-connect/userinfo`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const result = await axios(config);
  return result?.data?.preferred_username;
};

module.exports = {
  createUserKeyCloak,
  getAccessToken,
  getUserId,
  getUserInfo,
  addRoleToAdmin,
  getAccessTokenByRefreshToken,
  getUserByUserName,
  updatePassword,
  deleteUser,
};
