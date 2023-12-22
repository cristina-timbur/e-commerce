const {
  loginResultType,
  loginInputType,
  registerInputType,
  registerResultType,
} = require("./types");
const login = require("../../handlers/auth");
const { createUser } = require("../../handlers/users");
const {
  GraphQLObjectType,
} = require("graphql");

const authMutation = new GraphQLObjectType({
  name: "AuthMutation",
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: { type: loginInputType },
      },
      resolve: async (source, args) => {
        const { username, password } = args.loginInput;

        const token = await login(username, password);

        return {
          token,
        };
      },
    },

    register: {
      type: registerResultType,
      args: {
        registerInput: { type: registerInputType },
      },
      resolve: async (source, args) => {
        const data = args.registerInput;
        const result = await createUser(data);

        return result;
      },
    },
  },
});

module.exports = authMutation;
