## Chatbot workflow

### Set up document processing
```bash
pipeline = [
    IPFSDocumentFetcher(),  # Custom fetcher for IPFS
    OCRProcessor(),         # For image-based documents
    TextExtractor(),        # Extract text content
    MetadataExtractor()     # Extract document metadata
]
```
### Frontend Integeration

```javascript
// React component
const DocumentChat = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  
  const fetchFromIPFS = async (cid) => {
    // Fetch document from IPFS
  };
  
  const queryDocument = async (question) => {
    // Send query to backend RAG system
  };
};

```

