const validateUser = (req, res, next) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  // Ensure request data is provided
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }

  // Validate firstName
  if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2 || firstName.trim().length > 50) {
    return res.status(400).json({ message: 'Invalid first name: Must be a string between 2 and 50 characters' });
  }

  // Validate lastName
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2 || lastName.trim().length > 50) {
    return res.status(400).json({ message: 'Invalid last name: Must be a string between 2 and 50 characters' });
  }

  // Validate emailAddress
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailAddress || typeof emailAddress !== 'string' || !emailRegex.test(emailAddress)) {
    return res.status(400).json({ message: 'Invalid email address: Must follow the correct email format' });
  }

  // Validate password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Invalid password: Must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
    });
  }

  // Pass control to the next middleware function
  next();
};
const validateMeal = (req, res, next) => {
  const { name, description, price, dateTime, maxAmountOfParticipants, imageUrl } = req.body;

  // Ensure request data is provided
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({ message: 'Invalid meal name: Must be a string between 2 and 100 characters' });
  }

  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 500) {
    return res.status(400).json({ message: 'Invalid meal description: Must be a string between 10 and 500 characters' });
  }

  // Validate price
  if (price === undefined || typeof price !== 'number' || price <= 0 || price > 10000) {
    return res.status(400).json({ message: 'Invalid meal price: Must be a positive number not exceeding 10,000' });
  }

  // Validate dateTime
  const parsedDateTime = new Date(dateTime);
  if (!dateTime || !(parsedDateTime instanceof Date) || isNaN(parsedDateTime.getTime()) || parsedDateTime < new Date()) {
    return res.status(400).json({ message: 'Invalid meal date and time: Must be a valid future date and time' });
  }

  // Validate maxAmountOfParticipants
  if (maxAmountOfParticipants === undefined || typeof maxAmountOfParticipants !== 'number' || maxAmountOfParticipants < 1 || maxAmountOfParticipants > 1000) {
    return res.status(400).json({ message: 'Invalid maximum number of participants: Must be a positive number between 1 and 1000' });
  }

  // Validate imageUrl
  const imageUrlRegex = /^https?:\/\/.*\/(.+)\.(jpg|jpeg|png|gif|bmp)$/;
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrlRegex.test(imageUrl)) {
    return res.status(400).json({ message: 'Invalid meal image URL: Must be a valid image URL ending with jpg, jpeg, png, gif, or bmp' });
  }

  next();
};

module.exports = { validateUser, validateMeal };
