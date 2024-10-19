import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from "jspdf";

const DocsBot = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access your API key as an environment variable
  const API_KEY = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputText) return;

    const newMessage = { prompt: inputText, response: "Loading..." };
    setChatHistory([...chatHistory, newMessage]);
    setLoading(true);

    try {
      const prompt = `Reply to the following prompt: "${inputText}"`;
      const result = await model.generateContent(prompt);

      // Extract the response and ensure it's formatted exactly as returned
      const response = await result.response.text();

      // Update chat history with the exact same response format
      setChatHistory((prevChatHistory) =>
        prevChatHistory.map((message, index) =>
          index === prevChatHistory.length - 1
            ? { ...message, response } // Preserve exact formatting of the response
            : message
        )
      );
    } catch (error) {
      console.error("Error generating content:", error);
      setChatHistory((prevChatHistory) =>
        prevChatHistory.map((message, index) =>
          index === prevChatHistory.length - 1
            ? { ...message, response: "Error generating content." }
            : message
        )
      );
    } finally {
      setLoading(false);
    }

    setInputText("");
  };

  const handleReset = () => {
    setChatHistory([]);
    setInputText("");
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    chatHistory.forEach((message, index) => {
      doc.text(`Prompt: ${message.prompt}`, 10, 10 + index * 10);
      doc.text(`Response: ${message.response}`, 10, 15 + index * 10);
      doc.text("---------------------------", 10, 20 + index * 10);
    });
    doc.save("chat_history.pdf");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        DocsBot
      </Typography>

      <TextField
        label="Enter your prompt"
        multiline
        fullWidth
        rows={2}
        variant="outlined"
        value={inputText}
        onChange={handleInputChange}
        sx={{ mb: 4 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        disabled={loading || !inputText}
        sx={{ mb: 2 }}
      >
        {loading ? "Generating..." : "Send"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={{ mb: 2, ml: 2 }}
      >
        Reset
      </Button>

      <Button
        variant="outlined"
        color="default"
        onClick={handleDownload}
        sx={{ mb: 2, ml: 2 }}
        disabled={chatHistory.length === 0}
      >
        Download PDF
      </Button>

      <Divider sx={{ mb: 4 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prompt</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chatHistory.map((message, index) => (
              <TableRow key={index}>
                <TableCell>{message.prompt}</TableCell>
                <TableCell>
                  {message.response === "Loading..." ? (
                    <CircularProgress size={20} />
                  ) : (
                    <pre
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    >
                      {message.response}
                    </pre>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocsBot;
