const ldap = require("ldapjs");

const ldapOtions = {
  url: ["ldap://192.168.200.4:389", "ldap://192.168.200.5:389"],
  reconnect: true,
  idleTimeout: 3000,
};

const client = ldap.createClient(ldapOtions); // Create LDAP client
// #-----------------------------LDAP search bases-----------------------------------#
const employeesSearchBase =
  "OU=Employees,OU=Users,OU=Office Infrastructure,DC=trmedia,DC=corp";

const groupsSearchBase =
  "OU=Groups,OU=Office Infrastructure,DC=trmedia,DC=corp";

// #---------------------------------------------------------------------------------#

// #-----------------------------LDAP search bases-----------------------------------#
const getAllListAuthorizationGroupsOpts = {
  attributes: ["cn", "member"],
  filter: `(objectClass=group)`,
  scope: "sub",
};
const getAllListAuthorizationEmployeesOpts = {
  attributes: ["cn", "sAMAccountName"],
  scope: "sub",
  filter: "(objectClass=user)",
};
const getEmployeeOpts = {
  attributes: [
    "title",
    "telephoneNumber",
    "sAMAccountName",
    "l",
    "c",
    "cn",
    "mail",
    "department",
    "manager",
    "description",
  ],
  scope: "sub",
  filter: "(objectClass=user)",
};

const getUserbarInfoOpts = {
  attributes: ["title", "sAMAccountName", "department", "description"],
  scope: "sub",
  filter: "(objectClass=user)",
};
const getAllEmployeesOpts = {
  attributes: ["title", "telephoneNumber", "mail", "department", "description"],
  scope: "sub",
  filter: "(objectClass=user)",
};
const getAllSearchBasedItemsCompletionOpts = {
  attributes: ["description", "department", "telephoneNumber", "mail", "title"],
  scope: "sub",
  filter: "(objectClass=user)",
};

// #---------------------------------------------------------------------------------#
// If there is error in LDAP client close connection
client.on("error", (err) => {
  console.log("LDAP client error:", err.name);
  client.unbind((err) => {
    console.log("Connection is closed");
  });
});

module.exports = {
  client,
  employeesSearchBase,
  groupsSearchBase,
  getAllListAuthorizationGroupsOpts,
  getAllListAuthorizationEmployeesOpts,
  getEmployeeOpts,
  getAllEmployeesOpts,
  getAllSearchBasedItemsCompletionOpts,
  getUserbarInfoOpts,
};
