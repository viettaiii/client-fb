import httpsRequest from "../api/axios";


export function useFileImage() {
    const handleFile = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const { data } = await httpsRequest.post("/api/upload", formData);
          return data.file;
        } catch (e) {
          console.log("Error", e);
        }
      };
    return handleFile;
}