<template>
  <div class="auth">
    <img class="auth-logo" src="/logo.svg" />
    <div class="auth-wrapper">
      <div class="auth-header" v-if="email_form">Registration</div>
      <div class="auth-header" v-if="name_form">
        <i
          @click="
            email_form = true;
            name_form = false;
          "
          class="bx bx-left-arrow-alt"
        ></i>
        What is Your name?
      </div>

      <div class="auth-header" v-if="phone_form">
        <i
          @click="
            name_form = true;
            phone_form = false;
          "
          class="bx bx-left-arrow-alt"
        ></i>
        Phone number
      </div>

      <div class="auth-header" v-if="phone_form">
        <i
          @click="
            phone_form = true;
            code_form = false;
          "
          class="bx bx-left-arrow-alt"
        ></i>
        Code
      </div>

      <p class="auth-warning" v-if="!isConfirm">Passwords do not match.</p>
      <form v-if="email_form" @submit.prevent="EmailSubmit()">
        <input v-model="user.email" required type="text" placeholder="Email" />

        <div class="auth-password">
          <input
            v-model="user.password"
            required
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
          />
          <i
            @click="showPassword = !showPassword"
            :class="showPassword ? 'bx-show' : 'bx-low-vision'"
            class="bx auth-password__icon"
          >
          </i>
        </div>

        <div class="auth-password">
          <input
            v-model="confirmPassword"
            required
            :type="showPasswordConfirm ? 'password' : 'text'"
            placeholder="Confirm password"
          />
          <i
            @click="showPasswordConfirm = !showPasswordConfirm"
            :class="showPasswordConfirm ? 'bx-show' : 'bx-low-vision'"
            class="bx auth-password__icon"
          >
          </i>
        </div>

        <button type="submit">Next</button>
      </form>
      <form
        v-if="name_form"
        @submit.prevent="
          name_form = false;
          phone_form = true;
        "
      >
        <input
          v-model="user.phone"
          required
          type="text"
          placeholder="Name"
          inputmode="numeric"
        />
        <p class="auth-message">Enter Your real name</p>
        <button type="submit">Next</button>
      </form>
      <form v-if="phone_form" @submit.prevent="PhoneSubmit()">
        <input
          v-model="user.name"
          required
          type="text"
          placeholder="+7"
          inputmode="numeric"
        />
        <p class="auth-message">
          We will send a confirmation code to your phone number
        </p>
        <button type="submit">Next</button>
      </form>
      <form v-if="code_form" @submit.prevent="CodeSubmit()">
        <input
          v-model="code"
          required
          type="text"
          placeholder="Confirmation Code"
          inputmode="numeric"
        />
        <p class="auth-message">Enter the confirmation code You received</p>
        <button type="submit">Next</button>
      </form>
    </div>
    <p class="auth-footer">
      Already have an account? <nuxt-link to="/login"> Log In </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      isConfirm: true,
      showPassword: false,
      showPasswordConfirm: false,
      confirmPassword: "",

      email_form: true,
      name_form: false,
      phone_form: false,
      code_form: false,
      final_form: false,

      user: {
        email: "",
        password: "",
        name: "",
        phone: "",
      },

      code: "",
    };
  },
  fetchOnServer: false,
  async fetch() {},
  methods: {
    async EmailSubmit() {
      if (this.confirmPassword !== this.user.password) {
        this.isConfirm = false;
      } else {
        this.email_form = false;
        this.name_form = true;
        this.isConfirm = true;
      }
    },
    PhoneSubmit() {
      this.$axios
        .$post("/auth/reg", this.user)
        .then((res) => {
          console.log(res);
          this.phone_form = false;
          this.code_form = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CodeSubmit() {},
  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;

  &-logo {
    margin-bottom: 40px;
  }

  &-wrapper {
    width: 100%;
    min-width: 300px;
    max-width: 500px;
    border-radius: 15px;
    transition: all 0.25s ease;
    background: #fff;
    padding: 26px 0;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.05);
    @include less-than(tablet) {
      max-width: 350px;
    }
  }

  &-header {
    padding: 5px 26px;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    i {
      margin-right: 15px;
      cursor: pointer;
      padding-top: 3px;
    }
  }

  &-warning {
    padding: 5px 26px;
    color: red;
  }

  &-password {
    display: flex;
    align-items: center;
    position: relative;
  }

  &-password__icon {
    position: absolute;
    right: 0;
    padding: 14px 16px 14px 12px;
    cursor: pointer;
    color: #a8a8a8;
  }

  input[type="text"],
  input[type="password"] {
    margin: 10px 0;
    width: 100%;
    border: 2px solid transparent;
    background: #f9f9f9;
    color: rgb(44, 62, 80);
    border-radius: 12px;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    padding: 14px 40px 14px 12px;
    outline: none;
  }

  form {
    padding: 10px 26px;
  }

  &-message {
    font-size: 12px;
    color: #999999;
    margin-bottom: 128px;
  }

  &-remember {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  &-remember__input {
    position: absolute;
    visibility: hidden;
  }
  &-remember__mark {
    height: 20px;
    width: 20px;
    border: 2px solid #3f3f3f;
    border-radius: 8px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      display: none;
    }
  }

  &-remember &-remember__input:checked ~ &-remember__mark {
    background-color: #77a648;
    border: none;
  }

  &-remember &-remember__input:checked ~ &-remember__mark {
    i {
      color: #fff;
      display: block;
    }
  }

  button {
    margin-top: 10px;
    border-radius: 15px;
    width: 100%;
    padding: 16px;
    color: #fff;
    transition: all ease 0.3s;
    cursor: pointer;
    background: #cecece;
    &:hover {
      background: #77a648;
      -webkit-box-shadow: 0 10px 20px -10px rgb(189, 195, 197);
      box-shadow: 0 10px 20px -10px rgb(178, 181, 182);
      -webkit-transform: translateY(-3px);
      transform: translateY(-3px);
    }
  }

  &-footer {
    margin-top: 20px;
    color: rgba(153, 153, 153, 1);
    font-size: 16px;
    a {
      color: rgba(119, 166, 72, 1);
      &:hover {
        color: rgb(100, 185, 15);
        text-shadow: 0px 0px 10px rgba(185, 243, 127, 0.2);
      }
    }
  }
}
</style>