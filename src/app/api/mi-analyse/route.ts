// // // 1
// // // import { NextResponse } from 'next/server';
// // // import { Pinecone } from '@pinecone-database/pinecone';
// // // import { ChatOpenAI } from '@langchain/openai';
// // // import { OpenAIEmbeddings } from '@langchain/openai';
// // // import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// // // import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// // // import Exa from 'exa-js';
// // // import fs from 'fs';
// // // import path from 'path';
// // // import { v4 as uuidv4 } from 'uuid';
// // // import prisma from '@/lib/prisma';

// // // // Initialize services
// // // const pc = new Pinecone({
// // //   apiKey: process.env.PINECONE_API_KEY
// // // });

// // // const exa = new Exa(process.env.EXA_API_KEY);
// // // const openai = new ChatOpenAI({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // //   temperature: 0.2,
// // //   modelName: 'gpt-3.5-turbo',
// // //   maxTokens: 2000,
// // // });

// // // // Use OpenAI embeddings
// // // const embeddings = new OpenAIEmbeddings({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // });

// // // // Legal software functionality constraints
// // // const FUNCTIONALITY_CONSTRAINTS = `
// // // Focus only on these legal software categories: Contract Lifecycle Management, Legal AI, Document Management System, E-discovery, IP Management, Legal Research, Litigation Management and Analytics.

// // // Use only these functionalities and lifecycle stages:

// // // Contract Lifecycle Management: Create → Negotiation → Authentication → Execute → Store → Tracking
// // // Legal AI: Data Import → Structuring → Analysis → Review → Workflow → Optimization  
// // // Document Management System: Capture → Change Management → Review → Organize → Access Management → Retrieval
// // // E-discovery: Discover → Preserve → Acquire → Examine → Evaluate → Present
// // // IP Management: Cataloging → Analysis → Protection → Monitoring → Enforcement → Reporting
// // // Legal Research: Query Identification → Source and Type Selection → Filtration and Sorting → Data Extraction → Data Analysis and Organization → Storage or Retrieval
// // // Litigation Management and Analytics: Intake → Strategize → Preparation → Litigation Support → Analytics → Outcome Evaluation

// // // Do not create new categories or functionalities outside of this scope.
// // // `;

// // // class AdvancedAIAnalysisWorkflow {
// // //   constructor() {
// // //     this.textSplitter = new RecursiveCharacterTextSplitter({
// // //       chunkSize: 1000,
// // //       chunkOverlap: 200,
// // //     });
// // //     this.subCategoryIndexes = new Map(); // Store sub-category-specific indexes
// // //   }

  
// // // // Graph format specifications
// // // getGraphFormat(type: string) {
// // //   const formats = {
// // //     'bar': {
// // //       format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
// // //       instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
// // //       example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
// // //     },
// // //     'horizontal-bar': {
// // //       format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
// // //       instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
// // //       example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
// // //     },
// // //     'line': {
// // //       format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
// // //       instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
// // //       example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
// // //     },
// // //     'pie': {
// // //       format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
// // //       instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
// // //       example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
// // //     },
// // //     'scatter': {
// // //       format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
// // //       instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
// // //       example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
// // //     },
// // //     'area': {
// // //       format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
// // //       instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
// // //       example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
// // //     }
// // //   };
  
// // //   return formats[type] || formats['bar'];
// // // }
// // //   // Download PDF from URL using fetch
// // //   async downloadPDF(pdfUrl, tempDir) {
// // //     try {
// // //       console.log(`📄 Downloading PDF: ${pdfUrl}`);
      
// // //       const response = await fetch(pdfUrl, {
// // //         method: 'GET',
// // //         headers: {
// // //           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
// // //         }
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const buffer = await response.arrayBuffer();
// // //       const fileName = `${uuidv4()}.pdf`;
// // //       const filePath = path.join(tempDir, fileName);
      
// // //       fs.writeFileSync(filePath, Buffer.from(buffer));
// // //       return filePath;
// // //     } catch (error) {
// // //       console.error(`Error downloading PDF from ${pdfUrl}:`, error);
// // //       throw error;
// // //     }
// // //   }

// // //   // Extract text from PDF
// // //   async extractPDFContent(pdfPath) {
// // //     try {
// // //       const loader = new PDFLoader(pdfPath);
// // //       const docs = await loader.load();
// // //       const content = docs.map(doc => doc.pageContent).join('\n\n');
// // //       console.log(`📄 PDF extracted: ${content.length} characters`);
// // //       return content;
// // //     } catch (error) {
// // //       console.error('Error extracting PDF content:', error);
// // //       return '';
// // //     }
// // //   }

// // //   // Extract content from web articles using Exa
// // //   async extractWebContent(articleUrls) {
// // //     try {
// // //       const result = await exa.getContents(articleUrls, {
// // //         text: true,
// // //         highlights: {
// // //           numSentences: 15,
// // //           query: "legal software features functionality technology stack use cases competitive analysis"
// // //         },
// // //         summary: {
// // //           query: "key features competitive advantages market positioning"
// // //         }
// // //       });

// // //       return result.results.map(item => ({
// // //         url: item.url,
// // //         title: item.title,
// // //         content: item.text,
// // //         highlights: item.highlights,
// // //         summary: item.summary
// // //       }));
// // //     } catch (error) {
// // //       console.error('Error extracting web content:', error);
// // //       return [];
// // //     }
// // //   }

// // //   // Validate URL
// // //   isValidUrl(string) {
// // //     try {
// // //       new URL(string);
// // //       return true;
// // //     } catch (_) {
// // //       return false;
// // //     }
// // //   }

// // //   // Get combined miData sources based on database field
// // //   getCombinedMiDataSources(databaseConfig, miData) {
// // //     const combinedSources = [];
    
// // //     if (!databaseConfig || !miData) {
// // //       return combinedSources;
// // //     }

// // //     // Loop through each top category in database config
// // //     for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
// // //       console.log(`🔍 Processing top category: ${topCategory}`);
      
// // //       // Check if this top category exists in miData
// // //       if (miData[topCategory]) {
// // //         // Loop through each sub category to combine
// // //         for (const subCategory of subCategories) {
// // //           console.log(`  📋 Adding sub category: ${subCategory}`);
          
// // //           if (miData[topCategory][subCategory]) {
// // //             combinedSources.push({
// // //               topCategory,
// // //               subCategory,
// // //               data: miData[topCategory][subCategory]
// // //             });
// // //           }
// // //         }
// // //       }
// // //     }
    
// // //     return combinedSources;
// // //   }

// // //   // Process content for a sub-category using combined sources
// // //   async processContentForSubCategory(subCategoryName, combinedSources) {
// // //     const allContent = [];
// // //     const tempDir = path.join(process.cwd(), 'temp');

// // //     if (!fs.existsSync(tempDir)) {
// // //       fs.mkdirSync(tempDir, { recursive: true });
// // //     }

// // //     try {
// // //       console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
// // //       console.log(`📊 Combined sources count: ${combinedSources.length}`);

// // //       for (const source of combinedSources) {
// // //         const { topCategory, subCategory, data } = source;
// // //         console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

// // //         // Process PDFs
// // //         if (data.pdflinks && data.pdflinks.length > 0) {
// // //           for (const pdfUrl of data.pdflinks) {
// // //             if (!this.isValidUrl(pdfUrl)) continue;

// // //             try {
// // //               const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
// // //               const pdfContent = await this.extractPDFContent(pdfPath);
              
// // //               if (pdfContent && pdfContent.trim().length > 100) {
// // //                 allContent.push({
// // //                   source: pdfUrl,
// // //                   type: 'pdf',
// // //                   category: `${topCategory}/${subCategory}`,
// // //                   content: pdfContent,
// // //                   metadata: {
// // //                     source_type: 'pdf',
// // //                     top_category: topCategory,
// // //                     sub_category: subCategory,
// // //                     sub_category_name: subCategoryName,
// // //                     url: pdfUrl,
// // //                     processed_at: new Date().toISOString(),
// // //                     content_length: pdfContent.length
// // //                   }
// // //                 });
// // //               }

// // //               if (fs.existsSync(pdfPath)) {
// // //                 fs.unlinkSync(pdfPath);
// // //               }
// // //             } catch (error) {
// // //               console.error(`Error processing PDF ${pdfUrl}:`, error);
// // //             }
// // //           }
// // //         }

// // //         // Process web articles
// // //         if (data.articlelinks && data.articlelinks.length > 0) {
// // //           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
// // //           if (validUrls.length > 0) {
// // //             try {
// // //               const webContent = await this.extractWebContent(validUrls);
              
// // //               webContent.forEach(item => {
// // //                 if (item.content && item.content.trim().length > 100) {
// // //                   allContent.push({
// // //                     source: item.url,
// // //                     type: 'article',
// // //                     category: `${topCategory}/${subCategory}`,
// // //                     content: item.content,
// // //                     title: item.title,
// // //                     highlights: item.highlights,
// // //                     summary: item.summary,
// // //                     metadata: {
// // //                       source_type: 'article',
// // //                       top_category: topCategory,
// // //                       sub_category: subCategory,
// // //                       sub_category_name: subCategoryName,
// // //                       url: item.url,
// // //                       title: item.title || '',
// // //                       processed_at: new Date().toISOString(),
// // //                       content_length: item.content.length
// // //                     }
// // //                   });
// // //                 }
// // //               });
// // //             } catch (error) {
// // //               console.error(`Error processing articles for ${topCategory}/${subCategory}:`, error);
// // //             }
// // //           }
// // //         }
// // //       }
// // //     } finally {
// // //       if (fs.existsSync(tempDir)) {
// // //         fs.rmSync(tempDir, { recursive: true, force: true });
// // //       }
// // //     }

// // //     console.log(`✅ Processed ${allContent.length} content items for ${subCategoryName}`);
// // //     return allContent;
// // //   }

// // //   // Create sub-category-specific Pinecone index and store content
// // //   async createSubCategoryRAG(subCategoryName, processedContent) {
// // //     try {
// // //       const indexName = `mi-subcategory-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
// // //       // Check if index exists
// // //       const indexList = await pc.listIndexes();
// // //       const indexExists = indexList.indexes?.some(index => index.name === indexName);

// // //       if (!indexExists) {
// // //         console.log(`📊 Creating Pinecone index for sub-category: ${subCategoryName}`);
// // //         await pc.createIndex({
// // //           name: indexName,
// // //           dimension: 1536,
// // //           metric: 'cosine',
// // //           spec: {
// // //             serverless: {
// // //               cloud: 'aws',
// // //               region: 'us-east-1'
// // //             }
// // //           },
// // //           waitUntilReady: true,
// // //         });
// // //       }

// // //       const index = pc.index(indexName);
// // //       this.subCategoryIndexes.set(subCategoryName, index);

// // //       // Store content in vectors
// // //       const vectors = [];
      
// // //       for (const item of processedContent) {
// // //         const chunks = await this.textSplitter.splitText(item.content);
        
// // //         for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
// // //           const chunk = chunks[chunkIndex];
// // //           const vectorId = `${item.type}_${chunkIndex}_${uuidv4()}`;
          
// // //           try {
// // //             const embedding = await embeddings.embedQuery(chunk);
            
// // //             vectors.push({
// // //               id: vectorId,
// // //               values: embedding,
// // //               metadata: {
// // //                 ...item.metadata,
// // //                 chunk_index: chunkIndex,
// // //                 chunk_text: chunk,
// // //                 source: item.source,
// // //                 type: item.type,
// // //                 title: item.title || '',
// // //                 chunk_length: chunk.length
// // //               }
// // //             });
// // //           } catch (embeddingError) {
// // //             console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
// // //           }
// // //         }
// // //       }

// // //       if (vectors.length > 0) {
// // //         const batchSize = 100;
// // //         for (let i = 0; i < vectors.length; i += batchSize) {
// // //           const batch = vectors.slice(i, i + batchSize);
// // //           await index.upsert(batch);
// // //           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${subCategoryName}`);
          
// // //           if (i + batchSize < vectors.length) {
// // //             await new Promise(resolve => setTimeout(resolve, 1000));
// // //           }
// // //         }
// // //       }

// // //       console.log(`✅ Created RAG for ${subCategoryName} with ${vectors.length} vectors`);
// // //       return vectors.length;
// // //     } catch (error) {
// // //       console.error(`Error creating RAG for ${subCategoryName}:`, error);
// // //       throw error;
// // //     }
// // //   }

// // //   // Query sub-category-specific RAG
// // //   async querySubCategoryRAG(subCategoryName, question, responseType = 'default') {
// // //     try {
// // //       const index = this.subCategoryIndexes.get(subCategoryName);
// // //       if (!index) {
// // //         throw new Error(`No RAG index found for sub-category: ${subCategoryName}`);
// // //       }

// // //       const questionEmbedding = await embeddings.embedQuery(question);
      
// // //       const searchResults = await index.query({
// // //         vector: questionEmbedding,
// // //         topK: 8,
// // //         includeMetadata: true,
// // //         includeValues: false
// // //       });

// // //       const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
// // //       if (relevantMatches.length === 0) {
// // //         return "No relevant content found in the processed documents for this question.";
// // //       }

// // //       const context = relevantMatches
// // //         .map(match => match.metadata.chunk_text)
// // //         .join('\n\n');

// // //       let prompt;
      
// // //       if (responseType === 'point') {
// // //         prompt = `Based on the following context from legal software documents, answer: "${question}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // CONTEXT:
// // // ${context}

// // // IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// // // Example format:
// // // • Point one about the topic
// // // • Point two with specific details
// // // • Point three with key insights
// // // • Point four with important information

// // // BULLET POINT RESPONSE:`;
// // //       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
// // //         const graphFormat = this.getGraphFormat(responseType);
// // //         prompt = `Based on the following context from legal software documents, answer: "${question}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // CONTEXT:
// // // ${context}

// // // IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// // // ${graphFormat.instruction}

// // // Required format: ${graphFormat.format}
// // // Example: ${graphFormat.example}

// // // Respond with ONLY the formatted data, no additional text or explanations.

// // // ${responseType.toUpperCase()} CHART DATA:`;
// // //       } else {
// // //         prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // CONTEXT:
// // // ${context}

// // // Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

// // // RESPONSE:`;
// // //       }

// // //       const response = await openai.invoke(prompt);
// // //       return response.content || response;
      
// // //     } catch (error) {
// // //       console.error(`Error querying RAG for ${subCategoryName}:`, error);
// // //       return `Error querying RAG: ${error.message}`;
// // //     }
// // //   }

// // //   // Enhanced database query with better mock data
// // //   async queryDatabase(fields, prompt, responseType = 'default') {
// // //     try {
// // //       // TODO: Replace with actual Prisma query based on fields
// // //       // const products = await prisma.legalSoftware.findMany({
// // //       //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
// // //       // });

// // //       // Enhanced mock data for better responses
// // //       const mockData = {
// // //         coreFunctionalities: "Contract Creation: 8 vendors, Negotiation: 7 vendors, Analytics: 6 vendors, Repository: 8 vendors, AI Analysis: 5 vendors",
// // //         keyFeatures: "AI Analysis: 4 vendors, E-signatures: 8 vendors, Workflow Automation: 7 vendors, Collaboration: 8 vendors, Document Management: 6 vendors",
// // //         topUseCases: "Contract automation: 8 vendors, Legal team collaboration: 7 vendors, Compliance management: 6 vendors, Document workflow: 8 vendors, Risk assessment: 4 vendors",
// // //         userSatisfaction: "High satisfaction: 5 vendors, Good ratings: 7 vendors, Strong support: 6 vendors, Average rating 4.2/5: 8 vendors",
// // //         bestKnownFor: "Innovation: SpotDraft, Simplicity: ContractWorks, Usability: PandaDoc, Reliability: DocuSign, AI Power: Harvey, Speed: Ironclad",
// // //         criticalOpinions: "UI complexity: 3 vendors, Template limitations: 2 vendors, Pricing transparency: 4 vendors, Integration challenges: 2 vendors, Learning curve: 3 vendors",
// // //         caseStudies: "SpotDraft: 90% cycle time reduction, ContractWorks: 85% compliance improvement, PandaDoc: 70% faster approvals, DocuSign: 95% digital adoption, Harvey: 60% research time saved"
// // //       };

// // //       const contextData = fields.map(field => `${field}: ${mockData[field] || 'Not available'}`).join('\n');

// // //       let dbPrompt;
      
// // //       if (responseType === 'point') {
// // //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // DATABASE INFORMATION:
// // // ${contextData}

// // // IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// // // Example format:
// // // • Point one about the topic
// // // • Point two with specific details  
// // // • Point three with key insights
// // // • Point four with important information

// // // BULLET POINT RESPONSE:`;
// // //       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
// // //         const graphFormat = this.getGraphFormat(responseType);
// // //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // DATABASE INFORMATION:
// // // ${contextData}

// // // IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// // // ${graphFormat.instruction}

// // // Required format: ${graphFormat.format}
// // // Example: ${graphFormat.example}

// // // Extract relevant data from the database information and format it accordingly.
// // // Respond with ONLY the formatted data, no additional text or explanations.

// // // ${responseType.toUpperCase()} CHART DATA:`;
// // //       } else {
// // //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // // ${FUNCTIONALITY_CONSTRAINTS}

// // // DATABASE INFORMATION:
// // // ${contextData}

// // // Provide a structured response using only the information provided above.

// // // RESPONSE:`;
// // //       }

// // //       const response = await openai.invoke(dbPrompt);
// // //       return response.content || response;
      
// // //     } catch (error) {
// // //       console.error('Error querying database:', error);
// // //       return `Error querying database: ${error.message}`;
// // //     }
// // //   }

// // //   // Format response based on type
// // //   // formatResponse(ragResponse, dbResponse, type) {
// // //   //   switch (type) {
// // //   //     case 'bar':
// // //   //     case 'horizontal-bar':
// // //   //     case 'line':
// // //   //     case 'pie':
// // //   //     case 'scatter':
// // //   //     case 'area':
// // //   //       // For graph types, combine and clean the responses
// // //   //       const combinedGraphData = `${ragResponse}\n${dbResponse}`;
        
// // //   //       // Extract the best formatted data
// // //   //       const lines = combinedGraphData.split('\n').filter(line => line.trim());
// // //   //       let bestMatch = '';
        
// // //   //       // Look for lines that match the expected format
// // //   //       for (const line of lines) {
// // //   //         if (type === 'pie' && line.includes('%')) {
// // //   //           bestMatch = line.trim();
// // //   //           break;
// // //   //         } else if (type === 'scatter' && line.includes('(') && line.includes(')')) {
// // //   //           bestMatch = line.trim();
// // //   //           break;
// // //   //         } else if ((type === 'bar' || type === 'horizontal-bar' || type === 'line' || type === 'area') && line.includes(':')) {
// // //   //           // Check if it has the right format "Name: Number"
// // //   //           const pairs = line.split(',').map(pair => pair.trim());
// // //   //           const validPairs = pairs.filter(pair => {
// // //   //             const parts = pair.split(':');
// // //   //             return parts.length === 2 && !isNaN(parseFloat(parts[1].trim()));
// // //   //           });
// // //   //           if (validPairs.length >= 3) {
// // //   //             bestMatch = line.trim();
// // //   //             break;
// // //   //           }
// // //   //         }
// // //   //       }
        
// // //   //       // Fallback to generating format based on mock data
// // //   //       if (!bestMatch) {
// // //   //         const mockFormats = {
// // //   //           'bar': 'SpotDraft: 25, Harvey: 18, ContractWorks: 12, PandaDoc: 15, Ironclad: 10',
// // //   //           'line': 'Q1: 45, Q2: 52, Q3: 48, Q4: 60, Q5: 55',
// // //   //           'pie': 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%',
// // //   //           'scatter': 'SpotDraft: (9.2, 2500), Harvey: (8.8, 2200), ContractWorks: (7.8, 1800)',
// // //   //           'area': 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
// // //   //         };
// // //   //         bestMatch = mockFormats[type];
// // //   //       }
        
// // //   //       return bestMatch;
        
// // //   //     case 'point':
// // //   //       // Extract bullet points from both responses
// // //   //       const allPoints = [];
        
// // //   //       // Parse RAG response for bullet points
// // //   //       if (ragResponse && ragResponse !== "No relevant content found in the processed documents for this question.") {
// // //   //         const ragBullets = ragResponse.split('\n')
// // //   //           .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
// // //   //           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// // //   //           .filter(point => point.length > 10);
          
// // //   //         allPoints.push(...ragBullets);
          
// // //   //         // If no bullet points found, extract sentences
// // //   //         if (ragBullets.length === 0) {
// // //   //           const sentences = ragResponse.split(/[.!?]+/)
// // //   //             .map(s => s.trim())
// // //   //             .filter(s => s.length > 15 && s.length < 150)
// // //   //             .slice(0, 3);
// // //   //           allPoints.push(...sentences);
// // //   //         }
// // //   //       }
        
// // //   //       // Parse Database response for bullet points
// // //   //       if (dbResponse && dbResponse.trim().length > 0) {
// // //   //         const dbBullets = dbResponse.split('\n')
// // //   //           .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
// // //   //           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// // //   //           .filter(point => point.length > 10);
          
// // //   //         allPoints.push(...dbBullets);
          
// // //   //         // If no bullet points found, extract sentences
// // //   //         if (dbBullets.length === 0) {
// // //   //           const sentences = dbResponse.split(/[.!?]+/)
// // //   //             .map(s => s.trim())
// // //   //             .filter(s => s.length > 15 && s.length < 150)
// // //   //             .slice(0, 3);
// // //   //           allPoints.push(...sentences);
// // //   //         }
// // //   //       }
        
// // //   //       // If still no points, provide defaults
// // //   //       if (allPoints.length === 0) {
// // //   //         allPoints.push(
// // //   //           "Contract Lifecycle Management is the dominant category",
// // //   //           "AI-powered features are increasingly popular", 
// // //   //           "Cloud-based SaaS solutions are preferred",
// // //   //           "Integration capabilities are essential features"
// // //   //         );
// // //   //       }
        
// // //   //       // Clean up points and return array (max 6 points)
// // //   //       const cleanPoints = allPoints
// // //   //         .map(point => point.trim())
// // //   //         .filter(point => point.length > 0)
// // //   //         .slice(0, 6);
        
// // //   //       return cleanPoints;
        
// // //   //     default:
// // //   //       return `${ragResponse}\n\n${dbResponse}`;
// // //   //   }
// // //   // }
// // //   // Format response based on type
// // // formatResponse(ragResponse, dbResponse, type) {
// // //   // Add null/undefined checks
// // //   const safeRagResponse = ragResponse || '';
// // //   const safeDbResponse = dbResponse || '';
  
// // //   switch (type) {
// // //     case 'bar':
// // //     case 'horizontal-bar':
// // //     case 'line':
// // //     case 'pie':
// // //     case 'scatter':
// // //     case 'area':
// // //       // For graph types, combine and clean the responses
// // //       const combinedGraphData = `${safeRagResponse}\n${safeDbResponse}`;
      
// // //       // Extract the best formatted data
// // //       const lines = combinedGraphData.split('\n').filter(line => line && line.trim());
// // //       let bestMatch = '';
      
// // //       // Look for lines that match the expected format
// // //       for (const line of lines) {
// // //         if (!line || typeof line !== 'string') continue; // Add safety check
        
// // //         if (type === 'pie' && line.includes('%')) {
// // //           bestMatch = line.trim();
// // //           break;
// // //         } else if (type === 'scatter' && line.includes('(') && line.includes(')')) {
// // //           bestMatch = line.trim();
// // //           break;
// // //         } else if ((type === 'bar' || type === 'horizontal-bar' || type === 'line' || type === 'area') && line.includes(':')) {
// // //           // Check if it has the right format "Name: Number"
// // //           const pairs = line.split(',').map(pair => pair?.trim()).filter(Boolean); // Add safety checks
// // //           const validPairs = pairs.filter(pair => {
// // //             if (!pair || typeof pair !== 'string') return false; // Add safety check
// // //             const parts = pair.split(':');
// // //             return parts.length === 2 && !isNaN(parseFloat(parts[1]?.trim()));
// // //           });
// // //           if (validPairs && validPairs.length >= 3) { // Add null check
// // //             bestMatch = line.trim();
// // //             break;
// // //           }
// // //         }
// // //       }
      
// // //       // Fallback to generating format based on mock data
// // //       if (!bestMatch) {
// // //         const mockFormats = {
// // //           'bar': 'SpotDraft: 25, Harvey: 18, ContractWorks: 12, PandaDoc: 15, Ironclad: 10',
// // //           'horizontal-bar': 'SpotDraft: 25, Harvey: 18, ContractWorks: 12, PandaDoc: 15, Ironclad: 10', // Add explicit horizontal-bar
// // //           'line': 'Q1: 45, Q2: 52, Q3: 48, Q4: 60, Q5: 55',
// // //           'pie': 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%',
// // //           'scatter': 'SpotDraft: (9.2, 2500), Harvey: (8.8, 2200), ContractWorks: (7.8, 1800)',
// // //           'area': 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
// // //         };
// // //         bestMatch = mockFormats[type] || mockFormats['bar'];
// // //       }
      
// // //       return bestMatch;
      
// // //     case 'point':
// // //       // Extract bullet points from both responses
// // //       const allPoints = [];
      
// // //       // Parse RAG response for bullet points
// // //       if (safeRagResponse && safeRagResponse !== "No relevant content found in the processed documents for this question.") {
// // //         const ragBullets = safeRagResponse.split('\n')
// // //           .filter(line => line && line.trim() && (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')))
// // //           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// // //           .filter(point => point && point.length > 10);
        
// // //         allPoints.push(...ragBullets);
        
// // //         // If no bullet points found, extract sentences
// // //         if (ragBullets.length === 0) {
// // //           const sentences = safeRagResponse.split(/[.!?]+/)
// // //             .map(s => s?.trim())
// // //             .filter(s => s && s.length > 15 && s.length < 150)
// // //             .slice(0, 3);
// // //           allPoints.push(...sentences);
// // //         }
// // //       }
      
// // //       // Parse Database response for bullet points
// // //       if (safeDbResponse && safeDbResponse.trim().length > 0) {
// // //         const dbBullets = safeDbResponse.split('\n')
// // //           .filter(line => line && line.trim() && (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')))
// // //           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// // //           .filter(point => point && point.length > 10);
        
// // //         allPoints.push(...dbBullets);
        
// // //         // If no bullet points found, extract sentences
// // //         if (dbBullets.length === 0) {
// // //           const sentences = safeDbResponse.split(/[.!?]+/)
// // //             .map(s => s?.trim())
// // //             .filter(s => s && s.length > 15 && s.length < 150)
// // //             .slice(0, 3);
// // //           allPoints.push(...sentences);
// // //         }
// // //       }
      
// // //       // If still no points, provide defaults
// // //       if (allPoints.length === 0) {
// // //         allPoints.push(
// // //           "Contract Lifecycle Management is the dominant category",
// // //           "AI-powered features are increasingly popular", 
// // //           "Cloud-based SaaS solutions are preferred",
// // //           "Integration capabilities are essential features"
// // //         );
// // //       }
      
// // //       // Clean up points and return array (max 6 points)
// // //       const cleanPoints = allPoints
// // //         .map(point => point?.trim())
// // //         .filter(point => point && point.length > 0)
// // //         .slice(0, 6);
      
// // //       return cleanPoints;
      
// // //     default:
// // //       return `${safeRagResponse}\n\n${safeDbResponse}`;
// // //   }
// // // }

// // //   // Process insights structure with new flow
// // //   async processInsights(insights, miData) {
// // //     const results = { ...insights };
    
// // //     console.log('🚀 Starting Advanced AI Analysis Workflow (New Structure)...');
    
// // //     // Iterate through main categories (e.g., "competitive-intel")
// // //     for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
// // //       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
// // //       // Iterate through sub-categories (e.g., "key feature types")
// // //       for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
// // //         console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
// // //         // Check if this sub-category has a database field
// // //         if (subCategoryConfig.database) {
// // //           console.log(`📊 Found database config for ${subCategory}:`, subCategoryConfig.database);
          
// // //           // Get combined miData sources based on database config
// // //           const combinedSources = this.getCombinedMiDataSources(subCategoryConfig.database, miData);
          
// // //           if (combinedSources.length > 0) {
// // //             console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
            
// // //             // Process content from combined sources
// // //             const processedContent = await this.processContentForSubCategory(subCategory, combinedSources);
            
// // //             if (processedContent.length > 0) {
// // //               // Create sub-category-specific RAG
// // //               await this.createSubCategoryRAG(subCategory, processedContent);
              
// // //               // Process objects within sub-category (graph, content, insights, etc.)
// // //               for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
// // //                 if (objectKey === 'database') continue; // Skip database config
                
// // //                 console.log(`  📝 Processing object: ${objectKey}`);
                
// // //                 const { prompt, fields, type, heading } = objectConfig;
                
// // //                 if (prompt && fields) {
// // //                   console.log(`    🤖 Querying: "${prompt}"`);
                  
// // //                   // Query sub-category RAG
// // //                   const ragResponse = await this.querySubCategoryRAG(subCategory, prompt, type);
                  
// // //                   // Query Database
// // //                   const dbResponse = await this.queryDatabase(fields, prompt, type);
                  
// // //                   // Format combined response
// // //                   const finalResponse = this.formatResponse(ragResponse, dbResponse, type);
                  
// // //                   // Update results structure
// // //                   results[mainCategory][subCategory][objectKey].response = finalResponse;
                  
// // //                   console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
// // //                 }
// // //               }
// // //             } else {
// // //               console.log(`⚠️  No content processed for sub-category: ${subCategory}`);
// // //             }
// // //           } else {
// // //             console.log(`⚠️  No matching miData sources found for ${subCategory}`);
// // //           }
// // //         } else {
// // //           console.log(`⚠️  No database config found for sub-category: ${subCategory}`);
// // //         }
// // //       }
// // //     }
    
// // //     return results;
// // //   }

// // //   // Save enhanced insights to database
// // //   async saveEnhancedInsights(enhancedInsights, originalBody) {
// // //     try {
// // //       console.log('💾 Saving enhanced insights to MarketIntelligence table...');
      
// // //       let marketIntelRecord;
      
// // //       // Try to find existing record by ID if provided
// // //       if (originalBody.recordId) {
// // //         console.log(`🔍 Looking for record with ID: ${originalBody.recordId}`);
// // //         marketIntelRecord = await prisma.marketIntelligence.findUnique({
// // //           where: { id: originalBody.recordId }
// // //         });
// // //       }
      
// // //       // If no specific ID or record not found, get the latest record
// // //       if (!marketIntelRecord) {
// // //         console.log('🔍 No specific record found, getting latest record...');
// // //         marketIntelRecord = await prisma.marketIntelligence.findFirst({
// // //           orderBy: { createdAt: 'desc' }
// // //         });
// // //       }
      
// // //       // If record exists, update it
// // //       if (marketIntelRecord) {
// // //         console.log(`📝 Updating existing record: ${marketIntelRecord.id}`);
        
// // //         const updatedRecord = await prisma.marketIntelligence.update({
// // //           where: { id: marketIntelRecord.id },
// // //           data: {
// // //             insights: enhancedInsights,
// // //             updatedAt: new Date()
// // //           }
// // //         });
        
// // //         console.log('✅ Successfully updated insights in database');
        
// // //         return {
// // //           saved: true,
// // //           recordId: updatedRecord.id,
// // //           action: 'updated',
// // //           savedAt: updatedRecord.updatedAt.toISOString()
// // //         };
        
// // //       } else {
// // //         // If no record exists, create a new one
// // //         console.log('📝 No existing record found, creating new record...');
        
// // //         const newRecord = await prisma.marketIntelligence.create({
// // //           data: {
// // //             insights: enhancedInsights,
// // //             miData: originalBody.miData || null,
// // //             dashboardData: originalBody.dashboardData || null
// // //           }
// // //         });
        
// // //         console.log('✅ Successfully created new record with insights');
        
// // //         return {
// // //           saved: true,
// // //           recordId: newRecord.id,
// // //           action: 'created',
// // //           savedAt: newRecord.createdAt.toISOString()
// // //         };
// // //       }
      
// // //     } catch (error) {
// // //       console.error('❌ Error saving enhanced insights to database:', error);
      
// // //       // Return error details but don't throw to avoid breaking the API response
// // //       return {
// // //         saved: false,
// // //         error: error.message,
// // //         action: 'failed',
// // //         savedAt: new Date().toISOString()
// // //       };
// // //     }
// // //   }

// // //   // Main analysis workflow
// // //   async runAnalysis(body) {
// // //     try {
// // //       const { insights, miData, dashboardData } = body;
      
// // //       if (!insights || !miData) {
// // //         throw new Error('Missing required fields: insights and miData');
// // //       }

// // //       console.log('=== ADVANCED MI ANALYSIS STARTED (NEW STRUCTURE) ===');
      
// // //       // Process the complete insights structure
// // //       const enhancedInsights = await this.processInsights(insights, miData);
      
// // //       // Save enhanced insights to database
// // //       const saveResult = await this.saveEnhancedInsights(enhancedInsights, body);
      
// // //       return {
// // //         success: true,
// // //         insights: enhancedInsights,
// // //         saveResult: saveResult,
// // //         summary: {
// // //           totalMainCategories: Object.keys(insights).length,
// // //           totalSubCategories: Object.values(insights).reduce((acc, cat) => acc + Object.keys(cat).length, 0),
// // //           processedAt: new Date().toISOString(),
// // //           message: 'Analysis completed with new structure, RAG and database integration',
// // //           savedToDatabase: saveResult.saved
// // //         }
// // //       };
      
// // //     } catch (error) {
// // //       console.error('Analysis workflow error:', error);
// // //       throw error;
// // //     }
// // //   }
// // // }

// // // // API handler
// // // export async function POST(request) {
// // //   try {
// // //     const body = await request.json();
    
// // //     console.log('=== ADVANCED MI ANALYSE API CALLED (NEW STRUCTURE) ===');
// // //     console.log('Request structure:', {
// // //       hasInsights: !!body.insights,
// // //       hasMiData: !!body.miData,
// // //       hasDashboardData: !!body.dashboardData,
// // //       recordId: body.recordId || 'Not provided - will use latest record',
// // //       mainCategories: body.insights ? Object.keys(body.insights) : [],
// // //       miDataTopCategories: body.miData ? Object.keys(body.miData) : []
// // //     });
    
// // //     const workflow = new AdvancedAIAnalysisWorkflow();
// // //     const analysisResults = await workflow.runAnalysis(body);
    
// // //     console.log('\n=== ANALYSIS COMPLETED ===');
// // //     console.log('📊 Enhanced Insights Structure:');
// // //     console.log(JSON.stringify(analysisResults.insights, null, 2));
    
// // //     console.log('\n💾 DATABASE SAVE RESULT:');
// // //     console.log(`Action: ${analysisResults.saveResult.action}`);
// // //     console.log(`Record ID: ${analysisResults.saveResult.recordId}`);
// // //     console.log(`Saved: ${analysisResults.saveResult.saved}`);
// // //     console.log(`Saved At: ${analysisResults.saveResult.savedAt}`);
    
// // //     if (!analysisResults.saveResult.saved) {
// // //       console.log(`❌ Save Error: ${analysisResults.saveResult.error}`);
// // //     }
    
// // //     console.log('=== END ADVANCED MI ANALYSE ===');

// // //     return NextResponse.json(
// // //       { 
// // //         message: 'Advanced analysis completed successfully with new structure',
// // //         timestamp: new Date().toISOString(),
// // //         ...analysisResults
// // //       },
// // //       { status: 200 }
// // //     );
// // //   } catch (error) {
// // //     console.error('Error in Advanced MI Analyse API:', error);
// // //     return NextResponse.json(
// // //       { 
// // //         success: false,
// // //         error: 'Failed to process advanced analysis',
// // //         details: error.message,
// // //         timestamp: new Date().toISOString()
// // //       },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// import { NextResponse } from 'next/server';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { ChatOpenAI } from '@langchain/openai';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// import Exa from 'exa-js';
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import prisma from '@/lib/prisma';

// // Initialize services
// const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY
// });

// const exa = new Exa(process.env.EXA_API_KEY);
// const openai = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   temperature: 0.2,
//   modelName: 'gpt-3.5-turbo',
//   maxTokens: 2000,
// });

// // Use OpenAI embeddings
// const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Legal software functionality constraints
// const FUNCTIONALITY_CONSTRAINTS = `
// Focus only on these legal software categories: Contract Lifecycle Management, Legal AI, Document Management System, E-discovery, IP Management, Legal Research, Litigation Management and Analytics.

// Use only these functionalities and lifecycle stages:

// Contract Lifecycle Management: Create → Negotiation → Authentication → Execute → Store → Tracking
// Legal AI: Data Import → Structuring → Analysis → Review → Workflow → Optimization  
// Document Management System: Capture → Change Management → Review → Organize → Access Management → Retrieval
// E-discovery: Discover → Preserve → Acquire → Examine → Evaluate → Present
// IP Management: Cataloging → Analysis → Protection → Monitoring → Enforcement → Reporting
// Legal Research: Query Identification → Source and Type Selection → Filtration and Sorting → Data Extraction → Data Analysis and Organization → Storage or Retrieval
// Litigation Management and Analytics: Intake → Strategize → Preparation → Litigation Support → Analytics → Outcome Evaluation

// Do not create new categories or functionalities outside of this scope.
// `;

// class AdvancedAIAnalysisWorkflow {
//   constructor() {
//     this.textSplitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,
//       chunkOverlap: 200,
//     });
//     this.subCategoryIndexes = new Map(); // Store sub-category-specific indexes
//   }

//   // Graph format specifications
//   getGraphFormat(type) {
//     const formats = {
//       'bar': {
//         format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
//         instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
//         example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
//       },
//       'line': {
//         format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
//         instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
//         example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
//       },
//       'pie': {
//         format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
//         instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
//         example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
//       },
//       'scatter': {
//         format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
//         instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
//         example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
//       },
//       'area': {
//         format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
//         instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
//         example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
//       }
//     };
    
//     return formats[type] || formats['bar'];
//   }

//   // Download PDF from URL using fetch
//   async downloadPDF(pdfUrl, tempDir) {
//     try {
//       console.log(`📄 Downloading PDF: ${pdfUrl}`);
      
//       const response = await fetch(pdfUrl, {
//         method: 'GET',
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const buffer = await response.arrayBuffer();
//       const fileName = `${uuidv4()}.pdf`;
//       const filePath = path.join(tempDir, fileName);
      
//       fs.writeFileSync(filePath, Buffer.from(buffer));
//       return filePath;
//     } catch (error) {
//       console.error(`Error downloading PDF from ${pdfUrl}:`, error);
//       throw error;
//     }
//   }

//   // Extract text from PDF
//   async extractPDFContent(pdfPath) {
//     try {
//       const loader = new PDFLoader(pdfPath);
//       const docs = await loader.load();
//       const content = docs.map(doc => doc.pageContent).join('\n\n');
//       console.log(`📄 PDF extracted: ${content.length} characters`);
//       return content;
//     } catch (error) {
//       console.error('Error extracting PDF content:', error);
//       return '';
//     }
//   }

//   // Extract content from web articles using Exa
//   async extractWebContent(articleUrls) {
//     try {
//       const result = await exa.getContents(articleUrls, {
//         text: true,
//         highlights: {
//           numSentences: 15,
//           query: "legal software features functionality technology stack use cases competitive analysis"
//         },
//         summary: {
//           query: "key features competitive advantages market positioning"
//         }
//       });

//       return result.results.map(item => ({
//         url: item.url,
//         title: item.title,
//         content: item.text,
//         highlights: item.highlights,
//         summary: item.summary
//       }));
//     } catch (error) {
//       console.error('Error extracting web content:', error);
//       return [];
//     }
//   }

//   // Validate URL
//   isValidUrl(string) {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   }

//   // Get combined miData sources based on database field (with edge case handling)
//   getCombinedMiDataSources(databaseConfig, miData) {
//     const combinedSources = [];
    
//     if (!databaseConfig || !miData) {
//       console.log('⚠️  No database config or miData provided');
//       return combinedSources;
//     }

//     // Loop through each top category in database config
//     for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
//       console.log(`🔍 Processing top category: ${topCategory}`);
      
//       // Check if this top category exists in miData
//       if (miData[topCategory]) {
//         // Loop through each sub category to combine
//         for (const subCategory of subCategories) {
//           console.log(`  📋 Checking sub category: ${subCategory}`);
          
//           if (miData[topCategory][subCategory]) {
//             const data = miData[topCategory][subCategory];
            
//             // Check what sources are available
//             const hasPDFs = data.pdflinks && data.pdflinks.length > 0;
//             const hasArticles = data.articlelinks && data.articlelinks.length > 0;
            
//             if (hasPDFs || hasArticles) {
//               console.log(`  ✅ Adding: ${subCategory} (PDFs: ${hasPDFs}, Articles: ${hasArticles})`);
//               combinedSources.push({
//                 topCategory,
//                 subCategory,
//                 data: data,
//                 hasPDFs,
//                 hasArticles
//               });
//             } else {
//               console.log(`  ⚠️  Skipping ${subCategory}: No valid sources found`);
//             }
//           }
//         }
//       } else {
//         console.log(`⚠️  Top category ${topCategory} not found in miData`);
//       }
//     }
    
//     console.log(`📊 Total valid sources found: ${combinedSources.length}`);
//     return combinedSources;
//   }

//   // Process content for a sub-category using combined sources (with edge case handling)
//   async processContentForSubCategory(subCategoryName, combinedSources) {
//     const allContent = [];
//     const tempDir = path.join(process.cwd(), 'temp');

//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }

//     try {
//       console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
//       console.log(`📊 Combined sources count: ${combinedSources.length}`);

//       if (combinedSources.length === 0) {
//         console.log('⚠️  No sources to process - returning empty content');
//         return allContent;
//       }

//       for (const source of combinedSources) {
//         const { topCategory, subCategory, data, hasPDFs, hasArticles } = source;
//         console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

//         // Process PDFs only if they exist
//         if (hasPDFs) {
//           console.log(`    📄 Processing ${data.pdflinks.length} PDFs...`);
//           for (const pdfUrl of data.pdflinks) {
//             if (!this.isValidUrl(pdfUrl)) continue;

//             try {
//               const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
//               const pdfContent = await this.extractPDFContent(pdfPath);
              
//               if (pdfContent && pdfContent.trim().length > 100) {
//                 allContent.push({
//                   source: pdfUrl,
//                   type: 'pdf',
//                   category: `${topCategory}/${subCategory}`,
//                   content: pdfContent,
//                   metadata: {
//                     source_type: 'pdf',
//                     top_category: topCategory,
//                     sub_category: subCategory,
//                     sub_category_name: subCategoryName,
//                     url: pdfUrl,
//                     processed_at: new Date().toISOString(),
//                     content_length: pdfContent.length
//                   }
//                 });
//               }

//               if (fs.existsSync(pdfPath)) {
//                 fs.unlinkSync(pdfPath);
//               }
//             } catch (error) {
//               console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error);
//             }
//           }
//         }

//         // Process web articles only if they exist
//         if (hasArticles) {
//           console.log(`    🌐 Processing ${data.articlelinks.length} articles...`);
//           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
//           if (validUrls.length > 0) {
//             try {
//               const webContent = await this.extractWebContent(validUrls);
              
//               webContent.forEach(item => {
//                 if (item.content && item.content.trim().length > 100) {
//                   allContent.push({
//                     source: item.url,
//                     type: 'article',
//                     category: `${topCategory}/${subCategory}`,
//                     content: item.content,
//                     title: item.title,
//                     highlights: item.highlights,
//                     summary: item.summary,
//                     metadata: {
//                       source_type: 'article',
//                       top_category: topCategory,
//                       sub_category: subCategory,
//                       sub_category_name: subCategoryName,
//                       url: item.url,
//                       title: item.title || '',
//                       processed_at: new Date().toISOString(),
//                       content_length: item.content.length
//                     }
//                   });
//                 }
//               });
//             } catch (error) {
//               console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error);
//             }
//           }
//         }
//       }
//     } finally {
//       if (fs.existsSync(tempDir)) {
//         fs.rmSync(tempDir, { recursive: true, force: true });
//       }
//     }

//     console.log(`✅ Processed ${allContent.length} content items for ${subCategoryName}`);
//     return allContent;
//   }

//   // Create sub-category-specific Pinecone index and store content
//   async createSubCategoryRAG(subCategoryName, processedContent) {
//     try {
//       if (processedContent.length === 0) {
//         console.log(`⚠️  No content to create RAG for ${subCategoryName}`);
//         return 0;
//       }

//       const indexName = `mi-subcategory-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
//       // Check if index exists
//       const indexList = await pc.listIndexes();
//       const indexExists = indexList.indexes?.some(index => index.name === indexName);

//       if (!indexExists) {
//         console.log(`📊 Creating Pinecone index for sub-category: ${subCategoryName}`);
//         await pc.createIndex({
//           name: indexName,
//           dimension: 1536,
//           metric: 'cosine',
//           spec: {
//             serverless: {
//               cloud: 'aws',
//               region: 'us-east-1'
//             }
//           },
//           waitUntilReady: true,
//         });
//       }

//       const index = pc.index(indexName);
//       this.subCategoryIndexes.set(subCategoryName, index);

//       // Store content in vectors
//       const vectors = [];
      
//       for (const item of processedContent) {
//         const chunks = await this.textSplitter.splitText(item.content);
        
//         for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
//           const chunk = chunks[chunkIndex];
//           const vectorId = `${item.type}_${chunkIndex}_${uuidv4()}`;
          
//           try {
//             const embedding = await embeddings.embedQuery(chunk);
            
//             vectors.push({
//               id: vectorId,
//               values: embedding,
//               metadata: {
//                 ...item.metadata,
//                 chunk_index: chunkIndex,
//                 chunk_text: chunk,
//                 source: item.source,
//                 type: item.type,
//                 title: item.title || '',
//                 chunk_length: chunk.length
//               }
//             });
//           } catch (embeddingError) {
//             console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
//           }
//         }
//       }

//       if (vectors.length > 0) {
//         const batchSize = 100;
//         for (let i = 0; i < vectors.length; i += batchSize) {
//           const batch = vectors.slice(i, i + batchSize);
//           await index.upsert(batch);
//           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${subCategoryName}`);
          
//           if (i + batchSize < vectors.length) {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//           }
//         }
//       }

//       console.log(`✅ Created RAG for ${subCategoryName} with ${vectors.length} vectors`);
//       return vectors.length;
//     } catch (error) {
//       console.error(`Error creating RAG for ${subCategoryName}:`, error);
//       throw error;
//     }
//   }

//   // Query sub-category-specific RAG
//   async querySubCategoryRAG(subCategoryName, question, responseType = 'default') {
//     try {
//       const index = this.subCategoryIndexes.get(subCategoryName);
//       if (!index) {
//         console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
//         return "No RAG data available for this analysis.";
//       }

//       const questionEmbedding = await embeddings.embedQuery(question);
      
//       const searchResults = await index.query({
//         vector: questionEmbedding,
//         topK: 8,
//         includeMetadata: true,
//         includeValues: false
//       });

//       const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
//       if (relevantMatches.length === 0) {
//         return "No relevant content found in the processed documents for this question.";
//       }

//       const context = relevantMatches
//         .map(match => match.metadata.chunk_text)
//         .join('\n\n');

//       let prompt;
      
//       if (responseType === 'point') {
//         prompt = `Based on the following context from legal software documents, answer: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// Example format:
// • Point one about the topic
// • Point two with specific details
// • Point three with key insights
// • Point four with important information

// BULLET POINT RESPONSE:`;
//       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
//         const graphFormat = this.getGraphFormat(responseType);
//         prompt = `Based on the following context from legal software documents, answer: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// ${graphFormat.instruction}

// Required format: ${graphFormat.format}
// Example: ${graphFormat.example}

// Respond with ONLY the formatted data, no additional text or explanations.

// ${responseType.toUpperCase()} CHART DATA:`;
//       } else {
//         prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

// RESPONSE:`;
//       }

//       const response = await openai.invoke(prompt);
//       return response.content || response;
      
//     } catch (error) {
//       console.error(`Error querying RAG for ${subCategoryName}:`, error);
//       return `Error querying RAG: ${error.message}`;
//     }
//   }

//   // Smart data aggregation to avoid token limits
//   aggregateDataForAnalysis(products, fields, prompt) {
//     const aggregatedData = {
//       totalProducts: products.length,
//       fields: fields,
//       analysis: {}
//     };

//     // Pre-aggregate based on field types
//     fields.forEach(field => {
//       if (field === 'keyFeatures' || field === 'coreFunctionalities' || field === 'topUseCases') {
//         // Count frequency of features/functionalities/use cases
//         const counts = {};
//         products.forEach(product => {
//           let items = [];
          
//           if (product[field]) {
//             if (typeof product[field] === 'string') {
//               items = product[field].split(',').map(item => item.trim());
//             } else if (Array.isArray(product[field])) {
//               items = product[field].map(item => 
//                 typeof item === 'string' ? item : (item.heading || item.name || String(item))
//               );
//             }
//           }
          
//           items.forEach(item => {
//             if (item && item.length > 2) {
//               counts[item] = (counts[item] || 0) + 1;
//             }
//           });
//         });
        
//         // Get top 20 items to avoid token limits
//         const sortedItems = Object.entries(counts)
//           .sort(([,a], [,b]) => b - a)
//           .slice(0, 20)
//           .map(([item, count]) => ({ item, count, percentage: Math.round((count/products.length)*100) }));
        
//         aggregatedData.analysis[field] = {
//           topItems: sortedItems,
//           totalUniqueItems: Object.keys(counts).length
//         };
//       } else if (field === 'category') {
//         // Group by categories
//         const categoryCounts = {};
//         products.forEach(product => {
//           const category = product[field] || 'Unknown';
//           categoryCounts[category] = (categoryCounts[category] || 0) + 1;
//         });
        
//         aggregatedData.analysis[field] = Object.entries(categoryCounts)
//           .map(([category, count]) => ({ category, count, percentage: Math.round((count/products.length)*100) }));
//       } else if (field === 'productName') {
//         // List products with counts
//         const productCounts = {};
//         products.forEach(product => {
//           const name = product[field] || 'Unknown';
//           productCounts[name] = (productCounts[name] || 0) + 1;
//         });
        
//         aggregatedData.analysis[field] = Object.entries(productCounts)
//           .slice(0, 20) // Limit to top 20 products
//           .map(([name, count]) => ({ name, count }));
//       } else {
//         // For other fields, get sample values and counts
//         const values = products.map(p => p[field]).filter(Boolean);
//         const uniqueValues = [...new Set(values)].slice(0, 10); // Top 10 unique values
        
//         aggregatedData.analysis[field] = {
//           sampleValues: uniqueValues,
//           totalValues: values.length,
//           uniqueCount: [...new Set(values)].length
//         };
//       }
//     });

//     return aggregatedData;
//   }

//   // Dynamic database query with smart aggregation
//   async queryDatabase(fields, prompt, responseType = 'default') {
//     try {
//       console.log(`🔍 Dynamic database query for fields: ${fields.join(', ')}`);
//       console.log(`🤖 Prompt: "${prompt}"`);
      
//       // Build dynamic select clause based on requested fields
//       const selectClause = {};
//       fields.forEach(field => {
//         selectClause[field] = true;
//       });
      
//       // Always include productName and category for context
//       selectClause.productName = true;
//       selectClause.category = true;
      
//       console.log(`📊 Database select clause:`, selectClause);
      
//       // Get ALL products with the requested fields
//       const products = await prisma.legalSoftware.findMany({
//         select: selectClause
//       });
      
//       console.log(`📊 Found ${products.length} total products in database`);
      
//       if (products.length === 0) {
//         return "No products found in database.";
//       }
      
//       // Smart aggregation to avoid token limits
//       const aggregatedData = this.aggregateDataForAnalysis(products, fields, prompt);
      
//       console.log(`📊 Aggregated data size: ${JSON.stringify(aggregatedData).length} characters`);
      
//       // Build intelligent prompt based on response type
//       let dbPrompt;
      
//       if (responseType === 'point') {
//         dbPrompt = `You are analyzing ${products.length} legal software products. Answer this question: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// AGGREGATED DATA ANALYSIS:
// ${JSON.stringify(aggregatedData, null, 2)}

// INSTRUCTIONS:
// - Use the aggregated data to provide specific, data-driven insights
// - Reference actual numbers and percentages from the analysis
// - Focus on the most important findings from the data

// IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// BULLET POINT RESPONSE:`;
//       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
//         const graphFormat = this.getGraphFormat(responseType);
//         dbPrompt = `You are creating ${responseType.toUpperCase()} CHART data from ${products.length} legal software products. Answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// AGGREGATED DATA FOR CHART:
// ${JSON.stringify(aggregatedData, null, 2)}

// CHART REQUIREMENTS:
// ${graphFormat.instruction}
// Required format: ${graphFormat.format}
// Example: ${graphFormat.example}

// INSTRUCTIONS:
// - Use the aggregated data to create chart data that answers the question
// - Focus on the top items with highest counts/percentages
// - Ensure data format matches the chart type requirements exactly

// Respond with ONLY the formatted chart data, no additional text.

// ${responseType.toUpperCase()} CHART DATA:`;
//       } else {
//         dbPrompt = `You are analyzing ${products.length} legal software products. Answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// AGGREGATED DATA ANALYSIS:
// ${JSON.stringify(aggregatedData, null, 2)}

// INSTRUCTIONS:
// - Provide comprehensive analysis based on the aggregated data
// - Use specific numbers and percentages from the analysis
// - Be data-driven and insightful

// RESPONSE:`;
//       }

//       const response = await openai.invoke(dbPrompt);
//       return response.content || response;
      
//     } catch (error) {
//       console.error('Error in dynamic database query:', error);
//       return `Error querying database: ${error.message}`;
//     }
//   }

//   // Format response based on type (completely dynamic)
//   formatResponse(ragResponse, dbResponse, type, hasRAG = true, hasDB = true) {
//     console.log(`📝 Formatting response - Type: ${type}, HasRAG: ${hasRAG}, HasDB: ${hasDB}`);
    
//     switch (type) {
//       case 'bar':
//       case 'line':
//       case 'pie':
//       case 'scatter':
//       case 'area':
//         // For graph types, prioritize the response that has valid chart data
//         let bestResponse = null;
        
//         if (hasDB && dbResponse && dbResponse !== "No products found in database." && dbResponse.trim().length > 10) {
//           // Check if DB response looks like chart data
//           if (dbResponse.includes(':') && (dbResponse.includes(',') || dbResponse.includes('%'))) {
//             bestResponse = dbResponse.trim();
//           }
//         }
        
//         if (!bestResponse && hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis." && ragResponse.trim().length > 10) {
//           // Check if RAG response has chart data
//           const lines = ragResponse.split('\n').filter(line => line.trim());
//           for (const line of lines) {
//             if (line.includes(':') && (line.includes(',') || line.includes('%'))) {
//               bestResponse = line.trim();
//               break;
//             }
//           }
//         }
        
//         // If no structured data found, return the longer response
//         if (!bestResponse) {
//           if (hasDB && dbResponse && dbResponse.length > 20) {
//             bestResponse = dbResponse.trim();
//           } else if (hasRAG && ragResponse && ragResponse.length > 20) {
//             bestResponse = ragResponse.trim();
//           }
//         }
        
//         return bestResponse || "No chart data available";
        
//       case 'point':
//         // For point responses, combine available sources
//         const allPoints = [];
        
//         // Parse RAG response for bullet points if available
//         if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
//           const ragBullets = ragResponse.split('\n')
//             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
//             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
//             .filter(point => point.length > 10);
          
//           allPoints.push(...ragBullets);
          
//           // If no bullet points found, extract sentences
//           if (ragBullets.length === 0) {
//             const sentences = ragResponse.split(/[.!?]+/)
//               .map(s => s.trim())
//               .filter(s => s.length > 15 && s.length < 150)
//               .slice(0, 3);
//             allPoints.push(...sentences);
//           }
//         }
        
//         // Parse Database response for bullet points if available
//         if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
//           const dbBullets = dbResponse.split('\n')
//             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
//             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
//             .filter(point => point.length > 10);
          
//           allPoints.push(...dbBullets);
          
//           // If no bullet points found, extract sentences
//           if (dbBullets.length === 0) {
//             const sentences = dbResponse.split(/[.!?]+/)
//               .map(s => s.trim())
//               .filter(s => s.length > 15 && s.length < 150)
//               .slice(0, 3);
//             allPoints.push(...sentences);
//           }
//         }
        
//         // If still no points, provide generic fallback
//         if (allPoints.length === 0) {
//           return ["No specific insights available for this query", "Database analysis did not return sufficient data", "Please try a different query or check data availability"];
//         }
        
//         // Clean up points and return array (max 6 points)
//         const cleanPoints = allPoints
//           .map(point => point.trim())
//           .filter(point => point.length > 0)
//           .slice(0, 6);
        
//         return cleanPoints;
        
//       default:
//         // Combine available sources
//         const responses = [];
//         if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
//           responses.push(`Document Analysis: ${ragResponse}`);
//         }
//         if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
//           responses.push(`Database Analysis: ${dbResponse}`);
//         }
//         return responses.join('\n\n') || "No data available for analysis.";
//     }
//   }

//   // Process insights structure with new flow and edge case handling
//   async processInsights(insights, miData) {
//     const results = { ...insights };
    
//     console.log('🚀 Starting Advanced AI Analysis Workflow (New Structure with Edge Cases)...');
    
//     // Iterate through main categories (e.g., "competitive-intel")
//     for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
//       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
//       // Iterate through sub-categories (e.g., "key feature types")
//       for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
//         console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
//         let hasRAG = false;
//         let hasDB = true; // Database is always available (real queries now)
        
//         // Check if this sub-category has a database field
//         if (subCategoryConfig.database) {
//           console.log(`📊 Found database config for ${subCategory}:`, subCategoryConfig.database);
          
//           // Get combined miData sources based on database config
//           const combinedSources = this.getCombinedMiDataSources(subCategoryConfig.database, miData);
          
//           if (combinedSources.length > 0) {
//             console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
            
//             // Process content from combined sources
//             const processedContent = await this.processContentForSubCategory(subCategory, combinedSources);
            
//             if (processedContent.length > 0) {
//               // Create sub-category-specific RAG
//               await this.createSubCategoryRAG(subCategory, processedContent);
//               hasRAG = true;
//               console.log(`✅ RAG created successfully for ${subCategory}`);
//             } else {
//               console.log(`⚠️  No content processed for sub-category: ${subCategory} - will use database only`);
//             }
//           } else {
//             console.log(`⚠️  No matching miData sources found for ${subCategory} - will use database only`);
//           }
//         } else {
//           console.log(`⚠️  No database config found for sub-category: ${subCategory} - will use database only`);
//         }
        
//         // Process objects within sub-category (graph, content, insights, etc.)
//         for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
//           if (objectKey === 'database') continue; // Skip database config
          
//           console.log(`  📝 Processing object: ${objectKey}`);
          
//           const { prompt, fields, type, heading } = objectConfig;
          
//           if (prompt && fields) {
//             console.log(`    🤖 Querying: "${prompt}"`);
//             console.log(`    📊 Available sources - RAG: ${hasRAG}, DB: ${hasDB}`);
            
//             let ragResponse = "No RAG data available for this analysis.";
//             let dbResponse = "No database data available.";
            
//             // Query sub-category RAG if available
//             if (hasRAG) {
//               try {
//                 ragResponse = await this.querySubCategoryRAG(subCategory, prompt, type);
//                 console.log(`    ✅ RAG query completed`);
//               } catch (error) {
//                 console.log(`    ❌ RAG query failed:`, error.message);
//                 ragResponse = "RAG query failed.";
//               }
//             }
            
//             // Query Database (always attempt)
//             if (hasDB) {
//               try {
//                 dbResponse = await this.queryDatabase(fields, prompt, type);
//                 console.log(`    ✅ Database query completed`);
//               } catch (error) {
//                 console.log(`    ❌ Database query failed:`, error.message);
//                 dbResponse = "Database query failed.";
//                 hasDB = false;
//               }
//             }
            
//             // Format combined response
//             const finalResponse = this.formatResponse(ragResponse, dbResponse, type, hasRAG, hasDB);
            
//             // Update results structure
//             results[mainCategory][subCategory][objectKey].response = finalResponse;
            
//             console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
//           }
//         }
//       }
//     }
    
//     return results;
//   }

//   // Save enhanced insights to database
//   async saveEnhancedInsights(enhancedInsights, originalBody) {
//     try {
//       console.log('💾 Saving enhanced insights to MarketIntelligence table...');
      
//       let marketIntelRecord;
      
//       // Try to find existing record by ID if provided
//       if (originalBody.recordId) {
//         console.log(`🔍 Looking for record with ID: ${originalBody.recordId}`);
//         marketIntelRecord = await prisma.marketIntelligence.findUnique({
//           where: { id: originalBody.recordId }
//         });
//       }
      
//       // If no specific ID or record not found, get the latest record
//       if (!marketIntelRecord) {
//         console.log('🔍 No specific record found, getting latest record...');
//         marketIntelRecord = await prisma.marketIntelligence.findFirst({
//           orderBy: { createdAt: 'desc' }
//         });
//       }
      
//       // If record exists, update it
//       if (marketIntelRecord) {
//         console.log(`📝 Updating existing record: ${marketIntelRecord.id}`);
        
//         const updatedRecord = await prisma.marketIntelligence.update({
//           where: { id: marketIntelRecord.id },
//           data: {
//             insights: enhancedInsights,
//             updatedAt: new Date()
//           }
//         });
        
//         console.log('✅ Successfully updated insights in database');
        
//         return {
//           saved: true,
//           recordId: updatedRecord.id,
//           action: 'updated',
//           savedAt: updatedRecord.updatedAt.toISOString()
//         };
        
//       } else {
//         // If no record exists, create a new one
//         console.log('📝 No existing record found, creating new record...');
        
//         const newRecord = await prisma.marketIntelligence.create({
//           data: {
//             insights: enhancedInsights,
//             miData: originalBody.miData || null,
//             dashboardData: originalBody.dashboardData || null
//           }
//         });
        
//         console.log('✅ Successfully created new record with insights');
        
//         return {
//           saved: true,
//           recordId: newRecord.id,
//           action: 'created',
//           savedAt: newRecord.createdAt.toISOString()
//         };
//       }
      
//     } catch (error) {
//       console.error('❌ Error saving enhanced insights to database:', error);
      
//       // Return error details but don't throw to avoid breaking the API response
//       return {
//         saved: false,
//         error: error.message,
//         action: 'failed',
//         savedAt: new Date().toISOString()
//       };
//     }
//   }

//   // Main analysis workflow
//   async runAnalysis(body) {
//     try {
//       const { insights, miData, dashboardData } = body;
      
//       if (!insights) {
//         throw new Error('Missing required field: insights');
//       }

//       console.log('=== ADVANCED MI ANALYSIS STARTED (FULLY DYNAMIC SYSTEM) ===');
      
//       // Process the complete insights structure
//       const enhancedInsights = await this.processInsights(insights, miData);
      
//       // Save enhanced insights to database
//       const saveResult = await this.saveEnhancedInsights(enhancedInsights, body);
      
//       return {
//         success: true,
//         insights: enhancedInsights,
//         saveResult: saveResult,
//         summary: {
//           totalMainCategories: Object.keys(insights).length,
//           totalSubCategories: Object.values(insights).reduce((acc, cat) => acc + Object.keys(cat).length, 0),
//           processedAt: new Date().toISOString(),
//           message: 'Analysis completed with fully dynamic system - works for any query type',
//           savedToDatabase: saveResult.saved
//         }
//       };
      
//     } catch (error) {
//       console.error('Analysis workflow error:', error);
//       throw error;
//     }
//   }
// }

// // API handler
// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     console.log('=== ADVANCED MI ANALYSE API CALLED (FULLY DYNAMIC) ===');
//     console.log('Request structure:', {
//       hasInsights: !!body.insights,
//       hasMiData: !!body.miData,
//       hasDashboardData: !!body.dashboardData,
//       recordId: body.recordId || 'Not provided - will use latest record',
//       mainCategories: body.insights ? Object.keys(body.insights) : [],
//       miDataTopCategories: body.miData ? Object.keys(body.miData) : []
//     });
    
//     const workflow = new AdvancedAIAnalysisWorkflow();
//     const analysisResults = await workflow.runAnalysis(body);
    
//     console.log('\n=== ANALYSIS COMPLETED ===');
//     console.log('📊 Enhanced Insights Structure:');
//     console.log(JSON.stringify(analysisResults.insights, null, 2));
    
//     console.log('\n💾 DATABASE SAVE RESULT:');
//     console.log(`Action: ${analysisResults.saveResult.action}`);
//     console.log(`Record ID: ${analysisResults.saveResult.recordId}`);
//     console.log(`Saved: ${analysisResults.saveResult.saved}`);
//     console.log(`Saved At: ${analysisResults.saveResult.savedAt}`);
    
//     if (!analysisResults.saveResult.saved) {
//       console.log(`❌ Save Error: ${analysisResults.saveResult.error}`);
//     }
    
//     console.log('=== END ADVANCED MI ANALYSE ===');

//     return NextResponse.json(
//       { 
//         message: 'Advanced analysis completed successfully with fully dynamic query system',
//         timestamp: new Date().toISOString(),
//         ...analysisResults
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error in Advanced MI Analyse API:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to process advanced analysis',
//         details: error.message,
//         timestamp: new Date().toISOString()
//       },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from 'next/server';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { ChatOpenAI } from '@langchain/openai';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// import Exa from 'exa-js';
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import prisma from '@/lib/prisma';

// // Initialize services
// const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY
// });

// const exa = new Exa(process.env.EXA_API_KEY);
// const openai = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   temperature: 0.2,
//   modelName: 'gpt-4', // Using GPT-4 for 128k token limit
//   maxTokens: 4000,
// });

// // Use OpenAI embeddings
// const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Legal software functionality constraints
// const FUNCTIONALITY_CONSTRAINTS = `
// Focus only on these legal software categories: Contract Lifecycle Management, Legal AI, Document Management System, E-discovery, IP Management, Legal Research, Litigation Management and Analytics.

// Use only these functionalities and lifecycle stages:

// Contract Lifecycle Management: Create → Negotiation → Authentication → Execute → Store → Tracking
// Legal AI: Data Import → Structuring → Analysis → Review → Workflow → Optimization  
// Document Management System: Capture → Change Management → Review → Organize → Access Management → Retrieval
// E-discovery: Discover → Preserve → Acquire → Examine → Evaluate → Present
// IP Management: Cataloging → Analysis → Protection → Monitoring → Enforcement → Reporting
// Legal Research: Query Identification → Source and Type Selection → Filtration and Sorting → Data Extraction → Data Analysis and Organization → Storage or Retrieval
// Litigation Management and Analytics: Intake → Strategize → Preparation → Litigation Support → Analytics → Outcome Evaluation

// Do not create new categories or functionalities outside of this scope.
// `;

// class AdvancedAIAnalysisWorkflow {
//   constructor() {
//     this.textSplitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,
//       chunkOverlap: 200,
//     });
//     this.subCategoryIndexes = new Map(); // Store sub-category-specific indexes
//   }

//   // Graph format specifications
//   getGraphFormat(type) {
//     const formats = {
//       'bar': {
//         format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
//         instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
//         example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
//       },
//       'line': {
//         format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
//         instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
//         example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
//       },
//       'pie': {
//         format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
//         instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
//         example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
//       },
//       'scatter': {
//         format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
//         instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
//         example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
//       },
//       'area': {
//         format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
//         instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
//         example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
//       }
//     };
    
//     return formats[type] || formats['bar'];
//   }

//   // Download PDF from URL using fetch
//   async downloadPDF(pdfUrl, tempDir) {
//     try {
//       console.log(`📄 Downloading PDF: ${pdfUrl}`);
      
//       const response = await fetch(pdfUrl, {
//         method: 'GET',
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const buffer = await response.arrayBuffer();
//       const fileName = `${uuidv4()}.pdf`;
//       const filePath = path.join(tempDir, fileName);
      
//       fs.writeFileSync(filePath, Buffer.from(buffer));
//       return filePath;
//     } catch (error) {
//       console.error(`Error downloading PDF from ${pdfUrl}:`, error);
//       throw error;
//     }
//   }

//   // Extract text from PDF
//   async extractPDFContent(pdfPath) {
//     try {
//       const loader = new PDFLoader(pdfPath);
//       const docs = await loader.load();
//       const content = docs.map(doc => doc.pageContent).join('\n\n');
//       console.log(`📄 PDF extracted: ${content.length} characters`);
//       return content;
//     } catch (error) {
//       console.error('Error extracting PDF content:', error);
//       return '';
//     }
//   }

//   // Extract content from web articles using Exa
//   async extractWebContent(articleUrls) {
//     try {
//       const result = await exa.getContents(articleUrls, {
//         text: true,
//         highlights: {
//           numSentences: 15,
//           query: "legal software features functionality technology stack use cases competitive analysis"
//         },
//         summary: {
//           query: "key features competitive advantages market positioning"
//         }
//       });

//       return result.results.map(item => ({
//         url: item.url,
//         title: item.title,
//         content: item.text,
//         highlights: item.highlights,
//         summary: item.summary
//       }));
//     } catch (error) {
//       console.error('Error extracting web content:', error);
//       return [];
//     }
//   }

//   // Validate URL
//   isValidUrl(string) {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   }

//   // Get combined miData sources based on database field (with edge case handling)
//   getCombinedMiDataSources(databaseConfig, miData) {
//     const combinedSources = [];
    
//     if (!databaseConfig || !miData) {
//       console.log('⚠️  No database config or miData provided');
//       return combinedSources;
//     }

//     // Loop through each top category in database config
//     for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
//       console.log(`🔍 Processing top category: ${topCategory}`);
      
//       // Check if this top category exists in miData
//       if (miData[topCategory]) {
//         // Loop through each sub category to combine
//         for (const subCategory of subCategories) {
//           console.log(`  📋 Checking sub category: ${subCategory}`);
          
//           if (miData[topCategory][subCategory]) {
//             const data = miData[topCategory][subCategory];
            
//             // Check what sources are available
//             const hasPDFs = data.pdflinks && data.pdflinks.length > 0;
//             const hasArticles = data.articlelinks && data.articlelinks.length > 0;
            
//             if (hasPDFs || hasArticles) {
//               console.log(`  ✅ Adding: ${subCategory} (PDFs: ${hasPDFs}, Articles: ${hasArticles})`);
//               combinedSources.push({
//                 topCategory,
//                 subCategory,
//                 data: data,
//                 hasPDFs,
//                 hasArticles
//               });
//             } else {
//               console.log(`  ⚠️  Skipping ${subCategory}: No valid sources found`);
//             }
//           }
//         }
//       } else {
//         console.log(`⚠️  Top category ${topCategory} not found in miData`);
//       }
//     }
    
//     console.log(`📊 Total valid sources found: ${combinedSources.length}`);
//     return combinedSources;
//   }

//   // Process content for a sub-category using combined sources (with edge case handling)
//   async processContentForSubCategory(subCategoryName, combinedSources) {
//     const allContent = [];
//     const tempDir = path.join(process.cwd(), 'temp');

//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }

//     try {
//       console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
//       console.log(`📊 Combined sources count: ${combinedSources.length}`);

//       if (combinedSources.length === 0) {
//         console.log('⚠️  No sources to process - returning empty content');
//         return allContent;
//       }

//       for (const source of combinedSources) {
//         const { topCategory, subCategory, data, hasPDFs, hasArticles } = source;
//         console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

//         // Process PDFs only if they exist
//         if (hasPDFs) {
//           console.log(`    📄 Processing ${data.pdflinks.length} PDFs...`);
//           for (const pdfUrl of data.pdflinks) {
//             if (!this.isValidUrl(pdfUrl)) continue;

//             try {
//               const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
//               const pdfContent = await this.extractPDFContent(pdfPath);
              
//               if (pdfContent && pdfContent.trim().length > 100) {
//                 allContent.push({
//                   source: pdfUrl,
//                   type: 'pdf',
//                   category: `${topCategory}/${subCategory}`,
//                   content: pdfContent,
//                   metadata: {
//                     source_type: 'pdf',
//                     top_category: topCategory,
//                     sub_category: subCategory,
//                     sub_category_name: subCategoryName,
//                     url: pdfUrl,
//                     processed_at: new Date().toISOString(),
//                     content_length: pdfContent.length
//                   }
//                 });
//               }

//               if (fs.existsSync(pdfPath)) {
//                 fs.unlinkSync(pdfPath);
//               }
//             } catch (error) {
//               console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error);
//             }
//           }
//         }

//         // Process web articles only if they exist
//         if (hasArticles) {
//           console.log(`    🌐 Processing ${data.articlelinks.length} articles...`);
//           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
//           if (validUrls.length > 0) {
//             try {
//               const webContent = await this.extractWebContent(validUrls);
              
//               webContent.forEach(item => {
//                 if (item.content && item.content.trim().length > 100) {
//                   allContent.push({
//                     source: item.url,
//                     type: 'article',
//                     category: `${topCategory}/${subCategory}`,
//                     content: item.content,
//                     title: item.title,
//                     highlights: item.highlights,
//                     summary: item.summary,
//                     metadata: {
//                       source_type: 'article',
//                       top_category: topCategory,
//                       sub_category: subCategory,
//                       sub_category_name: subCategoryName,
//                       url: item.url,
//                       title: item.title || '',
//                       processed_at: new Date().toISOString(),
//                       content_length: item.content.length
//                     }
//                   });
//                 }
//               });
//             } catch (error) {
//               console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error);
//             }
//           }
//         }
//       }
//     } finally {
//       if (fs.existsSync(tempDir)) {
//         fs.rmSync(tempDir, { recursive: true, force: true });
//       }
//     }

//     console.log(`✅ Processed ${allContent.length} content items for ${subCategoryName}`);
//     return allContent;
//   }

//   // Create sub-category-specific Pinecone index and store content
//   async createSubCategoryRAG(subCategoryName, processedContent) {
//     try {
//       if (processedContent.length === 0) {
//         console.log(`⚠️  No content to create RAG for ${subCategoryName}`);
//         return 0;
//       }

//       const indexName = `mi-subcategory-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
//       // Check if index exists
//       const indexList = await pc.listIndexes();
//       const indexExists = indexList.indexes?.some(index => index.name === indexName);

//       if (!indexExists) {
//         console.log(`📊 Creating Pinecone index for sub-category: ${subCategoryName}`);
//         await pc.createIndex({
//           name: indexName,
//           dimension: 1536,
//           metric: 'cosine',
//           spec: {
//             serverless: {
//               cloud: 'aws',
//               region: 'us-east-1'
//             }
//           },
//           waitUntilReady: true,
//         });
//       }

//       const index = pc.index(indexName);
//       this.subCategoryIndexes.set(subCategoryName, index);

//       // Store content in vectors
//       const vectors = [];
      
//       for (const item of processedContent) {
//         const chunks = await this.textSplitter.splitText(item.content);
        
//         for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
//           const chunk = chunks[chunkIndex];
//           const vectorId = `${item.type}_${chunkIndex}_${uuidv4()}`;
          
//           try {
//             const embedding = await embeddings.embedQuery(chunk);
            
//             vectors.push({
//               id: vectorId,
//               values: embedding,
//               metadata: {
//                 ...item.metadata,
//                 chunk_index: chunkIndex,
//                 chunk_text: chunk,
//                 source: item.source,
//                 type: item.type,
//                 title: item.title || '',
//                 chunk_length: chunk.length
//               }
//             });
//           } catch (embeddingError) {
//             console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
//           }
//         }
//       }

//       if (vectors.length > 0) {
//         const batchSize = 100;
//         for (let i = 0; i < vectors.length; i += batchSize) {
//           const batch = vectors.slice(i, i + batchSize);
//           await index.upsert(batch);
//           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${subCategoryName}`);
          
//           if (i + batchSize < vectors.length) {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//           }
//         }
//       }

//       console.log(`✅ Created RAG for ${subCategoryName} with ${vectors.length} vectors`);
//       return vectors.length;
//     } catch (error) {
//       console.error(`Error creating RAG for ${subCategoryName}:`, error);
//       throw error;
//     }
//   }

//   // Query sub-category-specific RAG
//   async querySubCategoryRAG(subCategoryName, question, responseType = 'default') {
//     try {
//       const index = this.subCategoryIndexes.get(subCategoryName);
//       if (!index) {
//         console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
//         return "No RAG data available for this analysis.";
//       }

//       const questionEmbedding = await embeddings.embedQuery(question);
      
//       const searchResults = await index.query({
//         vector: questionEmbedding,
//         topK: 8,
//         includeMetadata: true,
//         includeValues: false
//       });

//       const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
//       if (relevantMatches.length === 0) {
//         return "No relevant content found in the processed documents for this question.";
//       }

//       const context = relevantMatches
//         .map(match => match.metadata.chunk_text)
//         .join('\n\n');

//       let prompt;
      
//       if (responseType === 'point') {
//         prompt = `Based on the following context from legal software documents, answer: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// Example format:
// • Point one about the topic
// • Point two with specific details
// • Point three with key insights
// • Point four with important information

// BULLET POINT RESPONSE:`;
//       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
//         const graphFormat = this.getGraphFormat(responseType);
//         prompt = `Based on the following context from legal software documents, answer: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// ${graphFormat.instruction}

// Required format: ${graphFormat.format}
// Example: ${graphFormat.example}

// Respond with ONLY the formatted data, no additional text or explanations.

// ${responseType.toUpperCase()} CHART DATA:`;
//       } else {
//         prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CONTEXT:
// ${context}

// Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

// RESPONSE:`;
//       }

//       const response = await openai.invoke(prompt);
//       return response.content || response;
      
//     } catch (error) {
//       console.error(`Error querying RAG for ${subCategoryName}:`, error);
//       return `Error querying RAG: ${error.message}`;
//     }
//   }

//   // Smart query analysis for intelligent filtering
//   analyzeQueryForFiltering(prompt) {
//     const lowercasePrompt = prompt.toLowerCase();
//     const filters = { where: {} };
    
//     console.log(`🧠 Analyzing query for smart filtering: "${prompt}"`);
    
//     // Category-based filtering
//     if (lowercasePrompt.includes('contract') || lowercasePrompt.includes('clm')) {
//       filters.where.category = { contains: 'Contract', mode: 'insensitive' };
//       console.log(`📂 Applied Contract filter`);
//     } else if (lowercasePrompt.includes('legal ai') || lowercasePrompt.includes('ai-powered') || lowercasePrompt.includes('artificial intelligence')) {
//       filters.where.category = { contains: 'AI', mode: 'insensitive' };
//       console.log(`📂 Applied Legal AI filter`);
//     } else if (lowercasePrompt.includes('document management') || lowercasePrompt.includes('dms')) {
//       filters.where.category = { contains: 'Document', mode: 'insensitive' };
//       console.log(`📂 Applied Document Management filter`);
//     } else if (lowercasePrompt.includes('e-discovery') || lowercasePrompt.includes('ediscovery')) {
//       filters.where.category = { contains: 'discovery', mode: 'insensitive' };
//       console.log(`📂 Applied E-discovery filter`);
//     } else if (lowercasePrompt.includes('ip management') || lowercasePrompt.includes('intellectual property')) {
//       filters.where.category = { contains: 'IP', mode: 'insensitive' };
//       console.log(`📂 Applied IP Management filter`);
//     } else if (lowercasePrompt.includes('legal research') || lowercasePrompt.includes('research tool')) {
//       filters.where.category = { contains: 'Research', mode: 'insensitive' };
//       console.log(`📂 Applied Legal Research filter`);
//     } else if (lowercasePrompt.includes('litigation') || lowercasePrompt.includes('case management')) {
//       filters.where.category = { contains: 'Litigation', mode: 'insensitive' };
//       console.log(`📂 Applied Litigation filter`);
//     }
    
//     // Pricing-based filtering
//     if (lowercasePrompt.includes('expensive') || lowercasePrompt.includes('costly') || lowercasePrompt.includes('price')) {
//       // Don't filter by category for pricing queries - need all products
//       filters.where = {};
//       console.log(`💰 Removed category filter for pricing analysis`);
//     }
    
//     // Premium vs non-premium filtering
//     if (lowercasePrompt.includes('premium') || lowercasePrompt.includes('enterprise')) {
//       filters.where.isPremium = true;
//       console.log(`⭐ Applied Premium filter`);
//     } else if (lowercasePrompt.includes('free') || lowercasePrompt.includes('basic')) {
//       filters.where.isPremium = false;
//       console.log(`🆓 Applied Non-premium filter`);
//     }
    
//     // Company size filtering based on target users
//     if (lowercasePrompt.includes('startup') || lowercasePrompt.includes('small business')) {
//       // Could add targetUsers filtering here if needed
//       console.log(`🏢 Detected startup/small business context`);
//     } else if (lowercasePrompt.includes('enterprise') || lowercasePrompt.includes('large company')) {
//       console.log(`🏛️ Detected enterprise context`);
//     }
    
//     return filters;
//   }

//   // Fallback aggregation method if raw data is too large
//   aggregateDataForAnalysis(products, fields, prompt) {
//     console.log(`📊 Using aggregation fallback for ${products.length} products`);
    
//     const aggregatedData = {
//       totalProducts: products.length,
//       fields: fields,
//       analysis: {}
//     };

//     // Pre-aggregate based on field types
//     fields.forEach(field => {
//       if (field === 'keyFeatures' || field === 'coreFunctionalities' || field === 'topUseCases') {
//         // Count frequency of features/functionalities/use cases
//         const counts = {};
//         products.forEach(product => {
//           let items = [];
          
//           if (product[field]) {
//             if (typeof product[field] === 'string') {
//               items = product[field].split(',').map(item => item.trim());
//             } else if (Array.isArray(product[field])) {
//               items = product[field].map(item => 
//                 typeof item === 'string' ? item : (item.heading || item.name || String(item))
//               );
//             }
//           }
          
//           items.forEach(item => {
//             if (item && item.length > 2) {
//               counts[item] = (counts[item] || 0) + 1;
//             }
//           });
//         });
        
//         // Get top 30 items for better analysis
//         const sortedItems = Object.entries(counts)
//           .sort(([,a], [,b]) => b - a)
//           .slice(0, 30)
//           .map(([item, count]) => ({ item, count, percentage: Math.round((count/products.length)*100) }));
        
//         aggregatedData.analysis[field] = {
//           topItems: sortedItems,
//           totalUniqueItems: Object.keys(counts).length
//         };
//       } else if (field === 'category') {
//         // Group by categories
//         const categoryCounts = {};
//         products.forEach(product => {
//           const category = product[field] || 'Unknown';
//           categoryCounts[category] = (categoryCounts[category] || 0) + 1;
//         });
        
//         aggregatedData.analysis[field] = Object.entries(categoryCounts)
//           .map(([category, count]) => ({ category, count, percentage: Math.round((count/products.length)*100) }));
//       } else if (field === 'productName') {
//         // List products with counts
//         const productCounts = {};
//         products.forEach(product => {
//           const name = product[field] || 'Unknown';
//           productCounts[name] = (productCounts[name] || 0) + 1;
//         });
        
//         aggregatedData.analysis[field] = Object.entries(productCounts)
//           .slice(0, 50) // Increased limit for better analysis
//           .map(([name, count]) => ({ name, count }));
//       } else {
//         // For other fields, get sample values and counts
//         const values = products.map(p => p[field]).filter(Boolean);
//         const uniqueValues = [...new Set(values)].slice(0, 20);
        
//         aggregatedData.analysis[field] = {
//           sampleValues: uniqueValues,
//           totalValues: values.length,
//           uniqueCount: [...new Set(values)].length
//         };
//       }
//     });

//     return aggregatedData;
//   }

//   // Dynamic database query with smart filtering and GPT-4
//   async queryDatabase(fields, prompt, responseType = 'default') {
//     try {
//       console.log(`🔍 Dynamic database query for fields: ${fields.join(', ')}`);
//       console.log(`🤖 Prompt: "${prompt}"`);
      
//       // Smart filtering based on query context
//       const queryFilters = this.analyzeQueryForFiltering(prompt);
      
//       // Build dynamic select clause based on requested fields
//       const selectClause = {};
//       fields.forEach(field => {
//         selectClause[field] = true;
//       });
      
//       // Always include essential fields for context
//       selectClause.productName = true;
//       selectClause.category = true;
      
//       console.log(`📊 Database filters:`, queryFilters.where);
//       console.log(`📊 Database select clause:`, selectClause);
      
//       // Get filtered products from database
//       const products = await prisma.legalSoftware.findMany({
//         where: queryFilters.where,
//         select: selectClause
//       });
      
//       console.log(`📊 Found ${products.length} products after smart filtering`);
      
//       if (products.length === 0) {
//         return "No products found matching the specified criteria.";
//       }
      
//       // Check if we need to send raw data or do aggregation
//       const dataSize = JSON.stringify(products).length;
//       console.log(`📏 Raw data size: ${dataSize} characters`);
      
//       let analysisData;
      
//       if (dataSize > 80000) { // Rough estimate for token safety
//         console.log(`⚠️  Data size too large, using aggregation approach`);
//         analysisData = this.aggregateDataForAnalysis(products, fields, prompt);
//       } else {
//         console.log(`✅ Data size acceptable, sending raw data for perfect accuracy`);
//         analysisData = {
//           totalProducts: products.length,
//           fields: fields,
//           products: products
//         };
//       }
      
//       console.log(`📊 Final analysis data size: ${JSON.stringify(analysisData).length} characters`);
      
//       // Build intelligent prompt for GPT-4
//       let dbPrompt;
      
//       if (responseType === 'point') {
//         dbPrompt = `You are analyzing ${products.length} legal software products. Answer this question: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// ANALYSIS DATA:
// ${JSON.stringify(analysisData, null, 2)}

// INSTRUCTIONS:
// - Provide accurate, data-driven insights based on the provided data
// - Use specific numbers and examples from the dataset
// - Focus on the most relevant findings that answer the question

// IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// BULLET POINT RESPONSE:`;
//       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
//         const graphFormat = this.getGraphFormat(responseType);
//         dbPrompt = `You are creating ${responseType.toUpperCase()} CHART data from ${products.length} legal software products. Answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// CHART DATA SOURCE:
// ${JSON.stringify(analysisData, null, 2)}

// CHART REQUIREMENTS:
// ${graphFormat.instruction}
// Required format: ${graphFormat.format}
// Example: ${graphFormat.example}

// INSTRUCTIONS:
// - Analyze the data to create accurate chart data
// - Count and rank items based on actual data provided
// - Ensure the chart format exactly matches the requirements
// - Provide precise numbers based on the dataset

// Respond with ONLY the formatted chart data, no additional text.

// ${responseType.toUpperCase()} CHART DATA:`;
//       } else {
//         dbPrompt = `You are analyzing ${products.length} legal software products. Answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// ANALYSIS DATA:
// ${JSON.stringify(analysisData, null, 2)}

// INSTRUCTIONS:
// - Provide comprehensive analysis based on the provided data
// - Use specific numbers, percentages, and examples
// - Be accurate and data-driven in your insights

// RESPONSE:`;
//       }

//       const response = await openai.invoke(dbPrompt);
//       return response.content || response;
      
//     } catch (error) {
//       console.error('Error in dynamic database query:', error);
//       return `Error querying database: ${error.message}`;
//     }
//   }

//   // Format response based on type (completely dynamic)
//   formatResponse(ragResponse, dbResponse, type, hasRAG = true, hasDB = true) {
//     console.log(`📝 Formatting response - Type: ${type}, HasRAG: ${hasRAG}, HasDB: ${hasDB}`);
    
//     switch (type) {
//       case 'bar':
//       case 'line':
//       case 'pie':
//       case 'scatter':
//       case 'area':
//         // For graph types, prioritize the response that has valid chart data
//         let bestResponse = null;
        
//         if (hasDB && dbResponse && dbResponse !== "No products found in database." && dbResponse.trim().length > 10) {
//           // Check if DB response looks like chart data
//           if (dbResponse.includes(':') && (dbResponse.includes(',') || dbResponse.includes('%'))) {
//             bestResponse = dbResponse.trim();
//           }
//         }
        
//         if (!bestResponse && hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis." && ragResponse.trim().length > 10) {
//           // Check if RAG response has chart data
//           const lines = ragResponse.split('\n').filter(line => line.trim());
//           for (const line of lines) {
//             if (line.includes(':') && (line.includes(',') || line.includes('%'))) {
//               bestResponse = line.trim();
//               break;
//             }
//           }
//         }
        
//         // If no structured data found, return the longer response
//         if (!bestResponse) {
//           if (hasDB && dbResponse && dbResponse.length > 20) {
//             bestResponse = dbResponse.trim();
//           } else if (hasRAG && ragResponse && ragResponse.length > 20) {
//             bestResponse = ragResponse.trim();
//           }
//         }
        
//         return bestResponse || "No chart data available";
        
//       case 'point':
//         // For point responses, combine available sources
//         const allPoints = [];
        
//         // Parse RAG response for bullet points if available
//         if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
//           const ragBullets = ragResponse.split('\n')
//             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
//             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
//             .filter(point => point.length > 10);
          
//           allPoints.push(...ragBullets);
          
//           // If no bullet points found, extract sentences
//           if (ragBullets.length === 0) {
//             const sentences = ragResponse.split(/[.!?]+/)
//               .map(s => s.trim())
//               .filter(s => s.length > 15 && s.length < 150)
//               .slice(0, 3);
//             allPoints.push(...sentences);
//           }
//         }
        
//         // Parse Database response for bullet points if available
//         if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
//           const dbBullets = dbResponse.split('\n')
//             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
//             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
//             .filter(point => point.length > 10);
          
//           allPoints.push(...dbBullets);
          
//           // If no bullet points found, extract sentences
//           if (dbBullets.length === 0) {
//             const sentences = dbResponse.split(/[.!?]+/)
//               .map(s => s.trim())
//               .filter(s => s.length > 15 && s.length < 150)
//               .slice(0, 3);
//             allPoints.push(...sentences);
//           }
//         }
        
//         // If still no points, provide generic fallback
//         if (allPoints.length === 0) {
//           return ["No specific insights available for this query", "Database analysis did not return sufficient data", "Please try a different query or check data availability"];
//         }
        
//         // Clean up points and return array (max 6 points)
//         const cleanPoints = allPoints
//           .map(point => point.trim())
//           .filter(point => point.length > 0)
//           .slice(0, 6);
        
//         return cleanPoints;
        
//       default:
//         // Combine available sources
//         const responses = [];
//         if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
//           responses.push(`Document Analysis: ${ragResponse}`);
//         }
//         if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
//           responses.push(`Database Analysis: ${dbResponse}`);
//         }
//         return responses.join('\n\n') || "No data available for analysis.";
//     }
//   }

//   // Process insights structure with new flow and edge case handling
//   async processInsights(insights, miData) {
//     const results = { ...insights };
    
//     console.log('🚀 Starting Advanced AI Analysis Workflow (New Structure with Edge Cases)...');
    
//     // Iterate through main categories (e.g., "competitive-intel")
//     for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
//       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
//       // Iterate through sub-categories (e.g., "key feature types")
//       for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
//         console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
//         let hasRAG = false;
//         let hasDB = true; // Database is always available (real queries now)
        
//         // Check if this sub-category has a database field
//         if (subCategoryConfig.database) {
//           console.log(`📊 Found database config for ${subCategory}:`, subCategoryConfig.database);
          
//           // Get combined miData sources based on database config
//           const combinedSources = this.getCombinedMiDataSources(subCategoryConfig.database, miData);
          
//           if (combinedSources.length > 0) {
//             console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
            
//             // Process content from combined sources
//             const processedContent = await this.processContentForSubCategory(subCategory, combinedSources);
            
//             if (processedContent.length > 0) {
//               // Create sub-category-specific RAG
//               await this.createSubCategoryRAG(subCategory, processedContent);
//               hasRAG = true;
//               console.log(`✅ RAG created successfully for ${subCategory}`);
//             } else {
//               console.log(`⚠️  No content processed for sub-category: ${subCategory} - will use database only`);
//             }
//           } else {
//             console.log(`⚠️  No matching miData sources found for ${subCategory} - will use database only`);
//           }
//         } else {
//           console.log(`⚠️  No database config found for sub-category: ${subCategory} - will use database only`);
//         }
        
//         // Process objects within sub-category (graph, content, insights, etc.)
//         for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
//           if (objectKey === 'database') continue; // Skip database config
          
//           console.log(`  📝 Processing object: ${objectKey}`);
          
//           const { prompt, fields, type, heading } = objectConfig;
          
//           if (prompt && fields) {
//             console.log(`    🤖 Querying: "${prompt}"`);
//             console.log(`    📊 Available sources - RAG: ${hasRAG}, DB: ${hasDB}`);
            
//             let ragResponse = "No RAG data available for this analysis.";
//             let dbResponse = "No database data available.";
            
//             // Query sub-category RAG if available
//             if (hasRAG) {
//               try {
//                 ragResponse = await this.querySubCategoryRAG(subCategory, prompt, type);
//                 console.log(`    ✅ RAG query completed`);
//               } catch (error) {
//                 console.log(`    ❌ RAG query failed:`, error.message);
//                 ragResponse = "RAG query failed.";
//               }
//             }
            
//             // Query Database (always attempt)
//             if (hasDB) {
//               try {
//                 dbResponse = await this.queryDatabase(fields, prompt, type);
//                 console.log(`    ✅ Database query completed`);
//               } catch (error) {
//                 console.log(`    ❌ Database query failed:`, error.message);
//                 dbResponse = "Database query failed.";
//                 hasDB = false;
//               }
//             }
            
//             // Format combined response
//             const finalResponse = this.formatResponse(ragResponse, dbResponse, type, hasRAG, hasDB);
            
//             // Update results structure
//             results[mainCategory][subCategory][objectKey].response = finalResponse;
            
//             console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
//           }
//         }
//       }
//     }
    
//     return results;
//   }

//   // Save enhanced insights to database
//   async saveEnhancedInsights(enhancedInsights, originalBody) {
//     try {
//       console.log('💾 Saving enhanced insights to MarketIntelligence table...');
      
//       let marketIntelRecord;
      
//       // Try to find existing record by ID if provided
//       if (originalBody.recordId) {
//         console.log(`🔍 Looking for record with ID: ${originalBody.recordId}`);
//         marketIntelRecord = await prisma.marketIntelligence.findUnique({
//           where: { id: originalBody.recordId }
//         });
//       }
      
//       // If no specific ID or record not found, get the latest record
//       if (!marketIntelRecord) {
//         console.log('🔍 No specific record found, getting latest record...');
//         marketIntelRecord = await prisma.marketIntelligence.findFirst({
//           orderBy: { createdAt: 'desc' }
//         });
//       }
      
//       // If record exists, update it
//       if (marketIntelRecord) {
//         console.log(`📝 Updating existing record: ${marketIntelRecord.id}`);
        
//         const updatedRecord = await prisma.marketIntelligence.update({
//           where: { id: marketIntelRecord.id },
//           data: {
//             insights: enhancedInsights,
//             updatedAt: new Date()
//           }
//         });
        
//         console.log('✅ Successfully updated insights in database');
        
//         return {
//           saved: true,
//           recordId: updatedRecord.id,
//           action: 'updated',
//           savedAt: updatedRecord.updatedAt.toISOString()
//         };
        
//       } else {
//         // If no record exists, create a new one
//         console.log('📝 No existing record found, creating new record...');
        
//         const newRecord = await prisma.marketIntelligence.create({
//           data: {
//             insights: enhancedInsights,
//             miData: originalBody.miData || null,
//             dashboardData: originalBody.dashboardData || null
//           }
//         });
        
//         console.log('✅ Successfully created new record with insights');
        
//         return {
//           saved: true,
//           recordId: newRecord.id,
//           action: 'created',
//           savedAt: newRecord.createdAt.toISOString()
//         };
//       }
      
//     } catch (error) {
//       console.error('❌ Error saving enhanced insights to database:', error);
      
//       // Return error details but don't throw to avoid breaking the API response
//       return {
//         saved: false,
//         error: error.message,
//         action: 'failed',
//         savedAt: new Date().toISOString()
//       };
//     }
//   }

//   // Main analysis workflow
//   async runAnalysis(body) {
//     try {
//       const { insights, miData, dashboardData } = body;
      
//       if (!insights) {
//         throw new Error('Missing required field: insights');
//       }

//       console.log('=== ADVANCED MI ANALYSIS STARTED (SMART FILTERING + GPT-4) ===');
      
//       // Process the complete insights structure
//       // const enhancedInsights = await this.processInsights(insights, miData);;
      
//       // Process the complete insights structure
//       const enhancedInsights = await this.processInsights(insights, miData);
      
//       // Save enhanced insights to database
//       const saveResult = await this.saveEnhancedInsights(enhancedInsights, body);
      
//       return {
//         success: true,
//         insights: enhancedInsights,
//         saveResult: saveResult,
//         summary: {
//           totalMainCategories: Object.keys(insights).length,
//           totalSubCategories: Object.values(insights).reduce((acc, cat) => acc + Object.keys(cat).length, 0),
//           processedAt: new Date().toISOString(),
//           message: 'Analysis completed with smart filtering and GPT-4 for perfect accuracy',
//           savedToDatabase: saveResult.saved
//         }
//       };
      
//     } catch (error) {
//       console.error('Analysis workflow error:', error);
//       throw error;
//     }
//   }
// }

// // API handler
// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     console.log('=== ADVANCED MI ANALYSE API CALLED (SMART FILTERING + GPT-4) ===');
//     console.log('Request structure:', {
//       hasInsights: !!body.insights,
//       hasMiData: !!body.miData,
//       hasDashboardData: !!body.dashboardData,
//       recordId: body.recordId || 'Not provided - will use latest record',
//       mainCategories: body.insights ? Object.keys(body.insights) : [],
//       miDataTopCategories: body.miData ? Object.keys(body.miData) : []
//     });
    
//     const workflow = new AdvancedAIAnalysisWorkflow();
//     const analysisResults = await workflow.runAnalysis(body);
    
//     console.log('\n=== ANALYSIS COMPLETED ===');
//     console.log('📊 Enhanced Insights Structure:');
//     console.log(JSON.stringify(analysisResults.insights, null, 2));
    
//     console.log('\n💾 DATABASE SAVE RESULT:');
//     console.log(`Action: ${analysisResults.saveResult.action}`);
//     console.log(`Record ID: ${analysisResults.saveResult.recordId}`);
//     console.log(`Saved: ${analysisResults.saveResult.saved}`);
//     console.log(`Saved At: ${analysisResults.saveResult.savedAt}`);
    
//     if (!analysisResults.saveResult.saved) {
//       console.log(`❌ Save Error: ${analysisResults.saveResult.error}`);
//     }
    
//     console.log('=== END ADVANCED MI ANALYSE ===');

//     return NextResponse.json(
//       { 
//         message: 'Advanced analysis completed with smart filtering + GPT-4 for perfect accuracy',
//         timestamp: new Date().toISOString(),
//         ...analysisResults
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error in Advanced MI Analyse API:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to process advanced analysis',
//         details: error.message,
//         timestamp: new Date().toISOString()
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import Exa from 'exa-js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';

// Initialize services
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const exa = new Exa(process.env.EXA_API_KEY);
const openai = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
  modelName: 'gpt-4', // Using GPT-4 for 128k token limit
  maxTokens: 4000,
});

// Use OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

// Legal software functionality constraints
const FUNCTIONALITY_CONSTRAINTS = `
Focus only on these legal software categories: Contract Lifecycle Management, Legal AI, Document Management System, E-discovery, IP Management, Legal Research, Litigation Management and Analytics.

Use only these functionalities and lifecycle stages:

Contract Lifecycle Management: Create → Negotiation → Authentication → Execute → Store → Tracking
Legal AI: Data Import → Structuring → Analysis → Review → Workflow → Optimization  
Document Management System: Capture → Change Management → Review → Organize → Access Management → Retrieval
E-discovery: Discover → Preserve → Acquire → Examine → Evaluate → Present
IP Management: Cataloging → Analysis → Protection → Monitoring → Enforcement → Reporting
Legal Research: Query Identification → Source and Type Selection → Filtration and Sorting → Data Extraction → Data Analysis and Organization → Storage or Retrieval
Litigation Management and Analytics: Intake → Strategize → Preparation → Litigation Support → Analytics → Outcome Evaluation

Do not create new categories or functionalities outside of this scope.
`;

class AdvancedAIAnalysisWorkflow {
  constructor() {
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    this.subCategoryIndexes = new Map(); // Store sub-category-specific indexes
  }

  // Graph format specifications
  getGraphFormat(type) {
    const formats = {
      'bar': {
        format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
        instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
        example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
      },
      'line': {
        format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
        instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
        example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
      },
      'pie': {
        format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
        instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
        example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
      },
      'scatter': {
        format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
        instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
        example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
      },
      'area': {
        format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
        instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
        example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
      }
    };
    
    return formats[type] || formats['bar'];
  }

  // Download PDF from URL using fetch
  async downloadPDF(pdfUrl, tempDir) {
    try {
      console.log(`📄 Downloading PDF: ${pdfUrl}`);
      
      const response = await fetch(pdfUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const fileName = `${uuidv4()}.pdf`;
      const filePath = path.join(tempDir, fileName);
      
      fs.writeFileSync(filePath, Buffer.from(buffer));
      return filePath;
    } catch (error) {
      console.error(`Error downloading PDF from ${pdfUrl}:`, error);
      throw error;
    }
  }

  // Extract text from PDF
  async extractPDFContent(pdfPath) {
    try {
      const loader = new PDFLoader(pdfPath);
      const docs = await loader.load();
      const content = docs.map(doc => doc.pageContent).join('\n\n');
      console.log(`📄 PDF extracted: ${content.length} characters`);
      return content;
    } catch (error) {
      console.error('Error extracting PDF content:', error);
      return '';
    }
  }

  // Extract content from web articles using Exa
  async extractWebContent(articleUrls) {
    try {
      const result = await exa.getContents(articleUrls, {
        text: true,
        highlights: {
          numSentences: 15,
          query: "legal software features functionality technology stack use cases competitive analysis"
        },
        summary: {
          query: "key features competitive advantages market positioning"
        }
      });

      return result.results.map(item => ({
        url: item.url,
        title: item.title,
        content: item.text,
        highlights: item.highlights,
        summary: item.summary
      }));
    } catch (error) {
      console.error('Error extracting web content:', error);
      return [];
    }
  }

  // Validate URL
  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Get combined miData sources based on database field (with edge case handling)
  getCombinedMiDataSources(databaseConfig, miData) {
    const combinedSources = [];
    
    if (!databaseConfig || !miData) {
      console.log('⚠️  No database config or miData provided');
      return combinedSources;
    }

    // Loop through each top category in database config
    for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
      console.log(`🔍 Processing top category: ${topCategory}`);
      
      // Check if this top category exists in miData
      if (miData[topCategory]) {
        // Loop through each sub category to combine
        for (const subCategory of subCategories) {
          console.log(`  📋 Checking sub category: ${subCategory}`);
          
          if (miData[topCategory][subCategory]) {
            const data = miData[topCategory][subCategory];
            
            // Check what sources are available
            const hasPDFs = data.pdflinks && data.pdflinks.length > 0;
            const hasArticles = data.articlelinks && data.articlelinks.length > 0;
            
            if (hasPDFs || hasArticles) {
              console.log(`  ✅ Adding: ${subCategory} (PDFs: ${hasPDFs}, Articles: ${hasArticles})`);
              combinedSources.push({
                topCategory,
                subCategory,
                data: data,
                hasPDFs,
                hasArticles
              });
            } else {
              console.log(`  ⚠️  Skipping ${subCategory}: No valid sources found`);
            }
          }
        }
      } else {
        console.log(`⚠️  Top category ${topCategory} not found in miData`);
      }
    }
    
    console.log(`📊 Total valid sources found: ${combinedSources.length}`);
    return combinedSources;
  }

  // Process content for a sub-category using combined sources (with edge case handling)
  async processContentForSubCategory(subCategoryName, combinedSources) {
    const allContent = [];
    const tempDir = path.join(process.cwd(), 'temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
      console.log(`📊 Combined sources count: ${combinedSources.length}`);

      if (combinedSources.length === 0) {
        console.log('⚠️  No sources to process - returning empty content');
        return allContent;
      }

      for (const source of combinedSources) {
        const { topCategory, subCategory, data, hasPDFs, hasArticles } = source;
        console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

        // Process PDFs only if they exist
        if (hasPDFs) {
          console.log(`    📄 Processing ${data.pdflinks.length} PDFs...`);
          for (const pdfUrl of data.pdflinks) {
            if (!this.isValidUrl(pdfUrl)) continue;

            try {
              const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
              const pdfContent = await this.extractPDFContent(pdfPath);
              
              if (pdfContent && pdfContent.trim().length > 100) {
                allContent.push({
                  source: pdfUrl,
                  type: 'pdf',
                  category: `${topCategory}/${subCategory}`,
                  content: pdfContent,
                  metadata: {
                    source_type: 'pdf',
                    top_category: topCategory,
                    sub_category: subCategory,
                    sub_category_name: subCategoryName,
                    url: pdfUrl,
                    processed_at: new Date().toISOString(),
                    content_length: pdfContent.length
                  }
                });
              }

              if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
              }
            } catch (error) {
              console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error);
            }
          }
        }

        // Process web articles only if they exist
        if (hasArticles) {
          console.log(`    🌐 Processing ${data.articlelinks.length} articles...`);
          const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
          if (validUrls.length > 0) {
            try {
              const webContent = await this.extractWebContent(validUrls);
              
              webContent.forEach(item => {
                if (item.content && item.content.trim().length > 100) {
                  allContent.push({
                    source: item.url,
                    type: 'article',
                    category: `${topCategory}/${subCategory}`,
                    content: item.content,
                    title: item.title,
                    highlights: item.highlights,
                    summary: item.summary,
                    metadata: {
                      source_type: 'article',
                      top_category: topCategory,
                      sub_category: subCategory,
                      sub_category_name: subCategoryName,
                      url: item.url,
                      title: item.title || '',
                      processed_at: new Date().toISOString(),
                      content_length: item.content.length
                    }
                  });
                }
              });
            } catch (error) {
              console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error);
            }
          }
        }
      }
    } finally {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }

    console.log(`✅ Processed ${allContent.length} content items for ${subCategoryName}`);
    return allContent;
  }

  // Create sub-category-specific Pinecone index and store content
  async createSubCategoryRAG(subCategoryName, processedContent) {
    try {
      if (processedContent.length === 0) {
        console.log(`⚠️  No content to create RAG for ${subCategoryName}`);
        return 0;
      }

      const indexName = `mi-subcategory-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Check if index exists
      const indexList = await pc.listIndexes();
      const indexExists = indexList.indexes?.some(index => index.name === indexName);

      if (!indexExists) {
        console.log(`📊 Creating Pinecone index for sub-category: ${subCategoryName}`);
        await pc.createIndex({
          name: indexName,
          dimension: 1536,
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1'
            }
          },
          waitUntilReady: true,
        });
      }

      const index = pc.index(indexName);
      this.subCategoryIndexes.set(subCategoryName, index);

      // Store content in vectors
      const vectors = [];
      
      for (const item of processedContent) {
        const chunks = await this.textSplitter.splitText(item.content);
        
        for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
          const chunk = chunks[chunkIndex];
          const vectorId = `${item.type}_${chunkIndex}_${uuidv4()}`;
          
          try {
            const embedding = await embeddings.embedQuery(chunk);
            
            vectors.push({
              id: vectorId,
              values: embedding,
              metadata: {
                ...item.metadata,
                chunk_index: chunkIndex,
                chunk_text: chunk,
                source: item.source,
                type: item.type,
                title: item.title || '',
                chunk_length: chunk.length
              }
            });
          } catch (embeddingError) {
            console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
          }
        }
      }

      if (vectors.length > 0) {
        const batchSize = 100;
        for (let i = 0; i < vectors.length; i += batchSize) {
          const batch = vectors.slice(i, i + batchSize);
          await index.upsert(batch);
          console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${subCategoryName}`);
          
          if (i + batchSize < vectors.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      console.log(`✅ Created RAG for ${subCategoryName} with ${vectors.length} vectors`);
      return vectors.length;
    } catch (error) {
      console.error(`Error creating RAG for ${subCategoryName}:`, error);
      throw error;
    }
  }

  // Query sub-category-specific RAG
  async querySubCategoryRAG(subCategoryName, question, responseType = 'default') {
    try {
      const index = this.subCategoryIndexes.get(subCategoryName);
      if (!index) {
        console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
        return "No RAG data available for this analysis.";
      }

      const questionEmbedding = await embeddings.embedQuery(question);
      
      const searchResults = await index.query({
        vector: questionEmbedding,
        topK: 8,
        includeMetadata: true,
        includeValues: false
      });

      const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
      if (relevantMatches.length === 0) {
        return "No relevant content found in the processed documents for this question.";
      }

      const context = relevantMatches
        .map(match => match.metadata.chunk_text)
        .join('\n\n');

      let prompt;
      
      if (responseType === 'point') {
        prompt = `Based on the following context from legal software documents, answer: "${question}"

${FUNCTIONALITY_CONSTRAINTS}

CONTEXT:
${context}

IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

Example format:
• Point one about the topic
• Point two with specific details
• Point three with key insights
• Point four with important information

BULLET POINT RESPONSE:`;
      } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
        const graphFormat = this.getGraphFormat(responseType);
        prompt = `Based on the following context from legal software documents, answer: "${question}"

${FUNCTIONALITY_CONSTRAINTS}

CONTEXT:
${context}

IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
${graphFormat.instruction}

Required format: ${graphFormat.format}
Example: ${graphFormat.example}

Respond with ONLY the formatted data, no additional text or explanations.

${responseType.toUpperCase()} CHART DATA:`;
      } else {
        prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

${FUNCTIONALITY_CONSTRAINTS}

CONTEXT:
${context}

Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

RESPONSE:`;
      }

      const response = await openai.invoke(prompt);
      return response.content || response;
      
    } catch (error) {
      console.error(`Error querying RAG for ${subCategoryName}:`, error);
      return `Error querying RAG: ${error.message}`;
    }
  }

  // Smart query analysis for intelligent filtering with proper enum handling
  analyzeQueryForFiltering(prompt) {
    const lowercasePrompt = prompt.toLowerCase();
    const filters = { where: {} };
    
    console.log(`🧠 Analyzing query for smart filtering: "${prompt}"`);
    
    // Category-based filtering using enum values (not contains)
    if (lowercasePrompt.includes('contract') || lowercasePrompt.includes('clm')) {
      // Use enum value - you may need to adjust these based on your actual enum values
      filters.where.category = { in: ['CONTRACT_LIFECYCLE_MANAGEMENT', 'CONTRACT_MANAGEMENT'] };
      console.log(`📂 Applied Contract filter with enum values`);
    } else if (lowercasePrompt.includes('legal ai') || lowercasePrompt.includes('ai-powered') || lowercasePrompt.includes('artificial intelligence')) {
      filters.where.category = { in: ['LEGAL_AI', 'AI_POWERED'] };
      console.log(`📂 Applied Legal AI filter with enum values`);
    } else if (lowercasePrompt.includes('document management') || lowercasePrompt.includes('dms')) {
      filters.where.category = { in: ['DOCUMENT_MANAGEMENT_SYSTEM', 'DOCUMENT_MANAGEMENT'] };
      console.log(`📂 Applied Document Management filter with enum values`);
    } else if (lowercasePrompt.includes('e-discovery') || lowercasePrompt.includes('ediscovery')) {
      filters.where.category = { in: ['E_DISCOVERY', 'EDISCOVERY'] };
      console.log(`📂 Applied E-discovery filter with enum values`);
    } else if (lowercasePrompt.includes('ip management') || lowercasePrompt.includes('intellectual property')) {
      filters.where.category = { in: ['IP_MANAGEMENT', 'INTELLECTUAL_PROPERTY'] };
      console.log(`📂 Applied IP Management filter with enum values`);
    } else if (lowercasePrompt.includes('legal research') || lowercasePrompt.includes('research tool')) {
      filters.where.category = { in: ['LEGAL_RESEARCH', 'RESEARCH'] };
      console.log(`📂 Applied Legal Research filter with enum values`);
    } else if (lowercasePrompt.includes('litigation') || lowercasePrompt.includes('case management')) {
      filters.where.category = { in: ['LITIGATION_MANAGEMENT', 'CASE_MANAGEMENT'] };
      console.log(`📂 Applied Litigation filter with enum values`);
    }
    
    // For pricing queries, remove category filter to get all products
    if (lowercasePrompt.includes('expensive') || lowercasePrompt.includes('costly') || lowercasePrompt.includes('price')) {
      filters.where = {}; // Clear category filter
      console.log(`💰 Removed category filter for pricing analysis`);
    }
    
    // Premium vs non-premium filtering
    if (lowercasePrompt.includes('premium') || lowercasePrompt.includes('enterprise')) {
      filters.where.isPremium = true;
      console.log(`⭐ Applied Premium filter`);
    } else if (lowercasePrompt.includes('free') || lowercasePrompt.includes('basic')) {
      filters.where.isPremium = false;
      console.log(`🆓 Applied Non-premium filter`);
    }
    
    // If no specific category detected, don't filter by category
    if (Object.keys(filters.where).length === 0) {
      console.log(`🌐 No specific category detected, querying all products`);
    }
    
    return filters;
  }

  // Fallback aggregation method if raw data is too large
  aggregateDataForAnalysis(products, fields, prompt) {
    console.log(`📊 Using aggregation fallback for ${products.length} products`);
    
    const aggregatedData = {
      totalProducts: products.length,
      fields: fields,
      analysis: {}
    };

    // Pre-aggregate based on field types
    fields.forEach(field => {
      if (field === 'keyFeatures' || field === 'coreFunctionalities' || field === 'topUseCases') {
        // Count frequency of features/functionalities/use cases
        const counts = {};
        products.forEach(product => {
          let items = [];
          
          if (product[field]) {
            if (typeof product[field] === 'string') {
              items = product[field].split(',').map(item => item.trim());
            } else if (Array.isArray(product[field])) {
              items = product[field].map(item => 
                typeof item === 'string' ? item : (item.heading || item.name || String(item))
              );
            }
          }
          
          items.forEach(item => {
            if (item && item.length > 2) {
              counts[item] = (counts[item] || 0) + 1;
            }
          });
        });
        
        // Get top 30 items for better analysis
        const sortedItems = Object.entries(counts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 30)
          .map(([item, count]) => ({ item, count, percentage: Math.round((count/products.length)*100) }));
        
        aggregatedData.analysis[field] = {
          topItems: sortedItems,
          totalUniqueItems: Object.keys(counts).length
        };
      } else if (field === 'category') {
        // Group by categories
        const categoryCounts = {};
        products.forEach(product => {
          const category = product[field] || 'Unknown';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        aggregatedData.analysis[field] = Object.entries(categoryCounts)
          .map(([category, count]) => ({ category, count, percentage: Math.round((count/products.length)*100) }));
      } else if (field === 'productName') {
        // List products with counts
        const productCounts = {};
        products.forEach(product => {
          const name = product[field] || 'Unknown';
          productCounts[name] = (productCounts[name] || 0) + 1;
        });
        
        aggregatedData.analysis[field] = Object.entries(productCounts)
          .slice(0, 50) // Increased limit for better analysis
          .map(([name, count]) => ({ name, count }));
      } else {
        // For other fields, get sample values and counts
        const values = products.map(p => p[field]).filter(Boolean);
        const uniqueValues = [...new Set(values)].slice(0, 20);
        
        aggregatedData.analysis[field] = {
          sampleValues: uniqueValues,
          totalValues: values.length,
          uniqueCount: [...new Set(values)].length
        };
      }
    });

    return aggregatedData;
  }

  // Dynamic database query with smart filtering and GPT-4 (with error handling)
  async queryDatabase(fields, prompt, responseType = 'default') {
    try {
      console.log(`🔍 Dynamic database query for fields: ${fields.join(', ')}`);
      console.log(`🤖 Prompt: "${prompt}"`);
      
      // Smart filtering based on query context
      let queryFilters;
      try {
        queryFilters = this.analyzeQueryForFiltering(prompt);
      } catch (filterError) {
        console.error('Error in filtering, using no filter:', filterError);
        queryFilters = { where: {} };
      }
      
      // Build dynamic select clause based on requested fields
      const selectClause = {};
      fields.forEach(field => {
        selectClause[field] = true;
      });
      
      // Always include essential fields for context
      selectClause.productName = true;
      selectClause.category = true;
      
      console.log(`📊 Database filters:`, queryFilters.where);
      console.log(`📊 Database select clause:`, selectClause);
      
      // Get filtered products from database with fallback
      let products;
      try {
        products = await prisma.legalSoftware.findMany({
          where: queryFilters.where,
          select: selectClause
        });
      } catch (prismaError) {
        console.error('Prisma query failed, trying without filters:', prismaError.message);
        // Fallback: query without filters
        products = await prisma.legalSoftware.findMany({
          where: {},
          select: selectClause
        });
      }
      
      console.log(`📊 Found ${products.length} products after smart filtering`);
      
      if (products.length === 0) {
        return "No products found matching the specified criteria.";
      }
      
      // Check if we need to send raw data or do aggregation
      const dataSize = JSON.stringify(products).length;
      console.log(`📏 Raw data size: ${dataSize} characters`);
      
      let analysisData;
      
      if (dataSize > 80000) { // Rough estimate for token safety
        console.log(`⚠️  Data size too large, using aggregation approach`);
        analysisData = this.aggregateDataForAnalysis(products, fields, prompt);
      } else {
        console.log(`✅ Data size acceptable, sending raw data for perfect accuracy`);
        analysisData = {
          totalProducts: products.length,
          fields: fields,
          products: products
        };
      }
      
      console.log(`📊 Final analysis data size: ${JSON.stringify(analysisData).length} characters`);
      
      // Build intelligent prompt for GPT-4
      let dbPrompt;
      
      if (responseType === 'point') {
        dbPrompt = `You are analyzing ${products.length} legal software products. Answer this question: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

ANALYSIS DATA:
${JSON.stringify(analysisData, null, 2)}

INSTRUCTIONS:
- Provide accurate, data-driven insights based on the provided data
- Use specific numbers and examples from the dataset
- Focus on the most relevant findings that answer the question

IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

BULLET POINT RESPONSE:`;
      } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
        const graphFormat = this.getGraphFormat(responseType);
        dbPrompt = `You are creating ${responseType.toUpperCase()} CHART data from ${products.length} legal software products. Answer: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

CHART DATA SOURCE:
${JSON.stringify(analysisData, null, 2)}

CHART REQUIREMENTS:
${graphFormat.instruction}
Required format: ${graphFormat.format}
Example: ${graphFormat.example}

INSTRUCTIONS:
- Analyze the data to create accurate chart data
- Count and rank items based on actual data provided
- Ensure the chart format exactly matches the requirements
- Provide precise numbers based on the dataset

Respond with ONLY the formatted chart data, no additional text.

${responseType.toUpperCase()} CHART DATA:`;
      } else {
        dbPrompt = `You are analyzing ${products.length} legal software products. Answer: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

ANALYSIS DATA:
${JSON.stringify(analysisData, null, 2)}

INSTRUCTIONS:
- Provide comprehensive analysis based on the provided data
- Use specific numbers, percentages, and examples
- Be accurate and data-driven in your insights

RESPONSE:`;
      }

      const response = await openai.invoke(dbPrompt);
      return response.content || response;
      
    } catch (error) {
      console.error('Error in dynamic database query:', error);
      return `Error querying database: ${error.message}`;
    }
  }

  // Format response based on type (completely dynamic)
  formatResponse(ragResponse, dbResponse, type, hasRAG = true, hasDB = true) {
    console.log(`📝 Formatting response - Type: ${type}, HasRAG: ${hasRAG}, HasDB: ${hasDB}`);
    
    switch (type) {
      case 'bar':
      case 'line':
      case 'pie':
      case 'scatter':
      case 'area':
        // For graph types, prioritize the response that has valid chart data
        let bestResponse = null;
        
        if (hasDB && dbResponse && dbResponse !== "No products found in database." && dbResponse.trim().length > 10) {
          // Check if DB response looks like chart data
          if (dbResponse.includes(':') && (dbResponse.includes(',') || dbResponse.includes('%'))) {
            bestResponse = dbResponse.trim();
          }
        }
        
        if (!bestResponse && hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis." && ragResponse.trim().length > 10) {
          // Check if RAG response has chart data
          const lines = ragResponse.split('\n').filter(line => line.trim());
          for (const line of lines) {
            if (line.includes(':') && (line.includes(',') || line.includes('%'))) {
              bestResponse = line.trim();
              break;
            }
          }
        }
        
        // If no structured data found, return the longer response
        if (!bestResponse) {
          if (hasDB && dbResponse && dbResponse.length > 20) {
            bestResponse = dbResponse.trim();
          } else if (hasRAG && ragResponse && ragResponse.length > 20) {
            bestResponse = ragResponse.trim();
          }
        }
        
        return bestResponse || "No chart data available";
        
      case 'point':
        // For point responses, combine available sources
        const allPoints = [];
        
        // Parse RAG response for bullet points if available
        if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
          const ragBullets = ragResponse.split('\n')
            .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
            .map(line => line.replace(/^[•\-*]\s*/, '').trim())
            .filter(point => point.length > 10);
          
          allPoints.push(...ragBullets);
          
          // If no bullet points found, extract sentences
          if (ragBullets.length === 0) {
            const sentences = ragResponse.split(/[.!?]+/)
              .map(s => s.trim())
              .filter(s => s.length > 15 && s.length < 150)
              .slice(0, 3);
            allPoints.push(...sentences);
          }
        }
        
        // Parse Database response for bullet points if available
        if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
          const dbBullets = dbResponse.split('\n')
            .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
            .map(line => line.replace(/^[•\-*]\s*/, '').trim())
            .filter(point => point.length > 10);
          
          allPoints.push(...dbBullets);
          
          // If no bullet points found, extract sentences
          if (dbBullets.length === 0) {
            const sentences = dbResponse.split(/[.!?]+/)
              .map(s => s.trim())
              .filter(s => s.length > 15 && s.length < 150)
              .slice(0, 3);
            allPoints.push(...sentences);
          }
        }
        
        // If still no points, provide generic fallback
        if (allPoints.length === 0) {
          return ["No specific insights available for this query", "Database analysis did not return sufficient data", "Please try a different query or check data availability"];
        }
        
        // Clean up points and return array (max 6 points)
        const cleanPoints = allPoints
          .map(point => point.trim())
          .filter(point => point.length > 0)
          .slice(0, 6);
        
        return cleanPoints;
        
      default:
        // Combine available sources
        const responses = [];
        if (hasRAG && ragResponse && ragResponse !== "No RAG data available for this analysis.") {
          responses.push(`Document Analysis: ${ragResponse}`);
        }
        if (hasDB && dbResponse && dbResponse !== "No products found in database.") {
          responses.push(`Database Analysis: ${dbResponse}`);
        }
        return responses.join('\n\n') || "No data available for analysis.";
    }
  }

  // Process insights structure with new flow and edge case handling
  async processInsights(insights, miData) {
    const results = { ...insights };
    
    console.log('🚀 Starting Advanced AI Analysis Workflow (New Structure with Edge Cases)...');
    
    // Iterate through main categories (e.g., "competitive-intel")
    for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
      console.log(`\n📋 Processing main category: ${mainCategory}`);
      
      // Iterate through sub-categories (e.g., "key feature types")
      for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
        console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
        let hasRAG = false;
        let hasDB = true; // Database is always available (real queries now)
        
        // Check if this sub-category has a database field
        if (subCategoryConfig.database) {
          console.log(`📊 Found database config for ${subCategory}:`, subCategoryConfig.database);
          
          // Get combined miData sources based on database config
          const combinedSources = this.getCombinedMiDataSources(subCategoryConfig.database, miData);
          
          if (combinedSources.length > 0) {
            console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
            
            // Process content from combined sources
            const processedContent = await this.processContentForSubCategory(subCategory, combinedSources);
            
            if (processedContent.length > 0) {
              // Create sub-category-specific RAG
              await this.createSubCategoryRAG(subCategory, processedContent);
              hasRAG = true;
              console.log(`✅ RAG created successfully for ${subCategory}`);
            } else {
              console.log(`⚠️  No content processed for sub-category: ${subCategory} - will use database only`);
            }
          } else {
            console.log(`⚠️  No matching miData sources found for ${subCategory} - will use database only`);
          }
        } else {
          console.log(`⚠️  No database config found for sub-category: ${subCategory} - will use database only`);
        }
        
        // Process objects within sub-category (graph, content, insights, etc.)
        for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
          if (objectKey === 'database') continue; // Skip database config
          
          console.log(`  📝 Processing object: ${objectKey}`);
          
          const { prompt, fields, type, heading } = objectConfig;
          
          if (prompt && fields) {
            console.log(`    🤖 Querying: "${prompt}"`);
            console.log(`    📊 Available sources - RAG: ${hasRAG}, DB: ${hasDB}`);
            
            let ragResponse = "No RAG data available for this analysis.";
            let dbResponse = "No database data available.";
            
            // Query sub-category RAG if available
            if (hasRAG) {
              try {
                ragResponse = await this.querySubCategoryRAG(subCategory, prompt, type);
                console.log(`    ✅ RAG query completed`);
              } catch (error) {
                console.log(`    ❌ RAG query failed:`, error.message);
                ragResponse = "RAG query failed.";
              }
            }
            
            // Query Database (always attempt)
            if (hasDB) {
              try {
                dbResponse = await this.queryDatabase(fields, prompt, type);
                console.log(`    ✅ Database query completed`);
              } catch (error) {
                console.log(`    ❌ Database query failed:`, error.message);
                dbResponse = "Database query failed.";
                hasDB = false;
              }
            }
            
            // Format combined response
            const finalResponse = this.formatResponse(ragResponse, dbResponse, type, hasRAG, hasDB);
            
            // Update results structure
            results[mainCategory][subCategory][objectKey].response = finalResponse;
            
            console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
          }
        }
      }
    }
    
    return results;
  }

  // Save enhanced insights to database
  async saveEnhancedInsights(enhancedInsights, originalBody) {
    try {
      console.log('💾 Saving enhanced insights to MarketIntelligence table...');
      
      let marketIntelRecord;
      
      // Try to find existing record by ID if provided
      if (originalBody.recordId) {
        console.log(`🔍 Looking for record with ID: ${originalBody.recordId}`);
        marketIntelRecord = await prisma.marketIntelligence.findUnique({
          where: { id: originalBody.recordId }
        });
      }
      
      // If no specific ID or record not found, get the latest record
      if (!marketIntelRecord) {
        console.log('🔍 No specific record found, getting latest record...');
        marketIntelRecord = await prisma.marketIntelligence.findFirst({
          orderBy: { createdAt: 'desc' }
        });
      }
      
      // If record exists, update it
      if (marketIntelRecord) {
        console.log(`📝 Updating existing record: ${marketIntelRecord.id}`);
        
        const updatedRecord = await prisma.marketIntelligence.update({
          where: { id: marketIntelRecord.id },
          data: {
            insights: enhancedInsights,
            updatedAt: new Date()
          }
        });
        
        console.log('✅ Successfully updated insights in database');
        
        return {
          saved: true,
          recordId: updatedRecord.id,
          action: 'updated',
          savedAt: updatedRecord.updatedAt.toISOString()
        };
        
      } else {
        // If no record exists, create a new one
        console.log('📝 No existing record found, creating new record...');
        
        const newRecord = await prisma.marketIntelligence.create({
          data: {
            insights: enhancedInsights,
            miData: originalBody.miData || null,
            dashboardData: originalBody.dashboardData || null
          }
        });
        
        console.log('✅ Successfully created new record with insights');
        
        return {
          saved: true,
          recordId: newRecord.id,
          action: 'created',
          savedAt: newRecord.createdAt.toISOString()
        };
      }
      
    } catch (error) {
      console.error('❌ Error saving enhanced insights to database:', error);
      
      // Return error details but don't throw to avoid breaking the API response
      return {
        saved: false,
        error: error.message,
        action: 'failed',
        savedAt: new Date().toISOString()
      };
    }
  }

  // Main analysis workflow
  async runAnalysis(body) {
    try {
      const { insights, miData, dashboardData } = body;
      
      if (!insights) {
        throw new Error('Missing required field: insights');
      }

      console.log('=== ADVANCED MI ANALYSIS STARTED (SMART FILTERING + GPT-4) ===');
      
      // Process the complete insights structure
      // const enhancedInsights = await this.processInsights(insights, miData);;
      
      // Process the complete insights structure
      const enhancedInsights = await this.processInsights(insights, miData);
      
      // Save enhanced insights to database
      const saveResult = await this.saveEnhancedInsights(enhancedInsights, body);
      
      return {
        success: true,
        insights: enhancedInsights,
        saveResult: saveResult,
        summary: {
          totalMainCategories: Object.keys(insights).length,
          totalSubCategories: Object.values(insights).reduce((acc, cat) => acc + Object.keys(cat).length, 0),
          processedAt: new Date().toISOString(),
          message: 'Analysis completed with smart filtering and GPT-4 for perfect accuracy',
          savedToDatabase: saveResult.saved
        }
      };
      
    } catch (error) {
      console.error('Analysis workflow error:', error);
      throw error;
    }
  }
}

// API handler
export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('=== ADVANCED MI ANALYSE API CALLED (SMART FILTERING + GPT-4) ===');
    console.log('Request structure:', {
      hasInsights: !!body.insights,
      hasMiData: !!body.miData,
      hasDashboardData: !!body.dashboardData,
      recordId: body.recordId || 'Not provided - will use latest record',
      mainCategories: body.insights ? Object.keys(body.insights) : [],
      miDataTopCategories: body.miData ? Object.keys(body.miData) : []
    });
    
    const workflow = new AdvancedAIAnalysisWorkflow();
    const analysisResults = await workflow.runAnalysis(body);
    
    console.log('\n=== ANALYSIS COMPLETED ===');
    console.log('📊 Enhanced Insights Structure:');
    console.log(JSON.stringify(analysisResults.insights, null, 2));
    
    console.log('\n💾 DATABASE SAVE RESULT:');
    console.log(`Action: ${analysisResults.saveResult.action}`);
    console.log(`Record ID: ${analysisResults.saveResult.recordId}`);
    console.log(`Saved: ${analysisResults.saveResult.saved}`);
    console.log(`Saved At: ${analysisResults.saveResult.savedAt}`);
    
    if (!analysisResults.saveResult.saved) {
      console.log(`❌ Save Error: ${analysisResults.saveResult.error}`);
    }
    
    console.log('=== END ADVANCED MI ANALYSE ===');

    return NextResponse.json(
      { 
        message: 'Advanced analysis completed with smart filtering + GPT-4 for perfect accuracy',
        timestamp: new Date().toISOString(),
        ...analysisResults
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in Advanced MI Analyse API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process advanced analysis',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}