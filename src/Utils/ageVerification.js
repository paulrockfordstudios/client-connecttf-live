// Function age verification
export const ageVerification = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    // Calculate age
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    // Adjust age if the birthday hasn't happened this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }  
    return age >= 18;
};