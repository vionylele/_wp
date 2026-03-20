const userProfile = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com"
};

function updateUserProfile(profile, key, value) {
  profile[key] = value;
}

updateUserProfile(userProfile, "age", 31);
console.log(userProfile); // Output: { name: "John Doe", age: 31, email: "john.doe@example.com" }
