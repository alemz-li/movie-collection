import connectDB from "./api/lib/database";
import app from "./app";
const PORT = process.env.PORT || 5000;

try {
  connectDB();

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
