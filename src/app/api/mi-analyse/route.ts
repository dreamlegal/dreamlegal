
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

// // // // Initialize services
// // // const pc = new Pinecone({
// // //   apiKey: process.env.PINECONE_API_KEY
// // // });

// // // const exa = new Exa(process.env.EXA_API_KEY);
// // // const openai = new ChatOpenAI({
// // //   // apiKey: process.env.OPENAI_API_KEY,
// // //   temperature: 0.2,
// // //   modelName: 'gpt-3.5-turbo',
// // //   maxTokens: 2000, // Set max tokens for longer responses
// // // });

// // // // Use OpenAI embeddings
// // // const embeddings = new OpenAIEmbeddings({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // });

// // // class AIAnalysisWorkflow {
// // //   constructor() {
// // //     this.indexName = 'mi-analysis-openai-index';
// // //     this.textSplitter = new RecursiveCharacterTextSplitter({
// // //       chunkSize: 1000,
// // //       chunkOverlap: 200,
// // //     });
// // //     this.index = null;
// // //   }

// // //   // Initialize Pinecone index with standard setup
// // //   async initializePineconeIndex() {
// // //     try {
// // //       // Check if index exists
// // //       const indexList = await pc.listIndexes();
// // //       const indexExists = indexList.indexes?.some(index => index.name === this.indexName);

// // //       if (!indexExists) {
// // //         console.log('Creating new Pinecone index...');
// // //         await pc.createIndex({
// // //           name: this.indexName,
// // //           dimension: 1536, // OpenAI embedding dimension
// // //           metric: 'cosine',
// // //           spec: {
// // //             serverless: {
// // //               cloud: 'aws',
// // //               region: 'us-east-1'
// // //             }
// // //           },
// // //           waitUntilReady: true,
// // //         });
// // //         console.log('Index created successfully!');
// // //       }

// // //       this.index = pc.index(this.indexName);
// // //       return this.index;
// // //     } catch (error) {
// // //       console.error('Error initializing Pinecone index:', error);
// // //       throw error;
// // //     }
// // //   }

// // //   // Download PDF from URL using fetch
// // //   async downloadPDF(pdfUrl, tempDir) {
// // //     try {
// // //       console.log(`Downloading PDF: ${pdfUrl}`);
      
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
      
// // //       // Write buffer to file
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
      
// // //       // Debug: Show extracted content length and preview
// // //       console.log(`📄 PDF extracted: ${content.length} characters`);
// // //       console.log(`📄 PDF preview (first 500 chars): ${content.substring(0, 500)}...`);
      
// // //       return content;
// // //     } catch (error) {
// // //       console.error('Error extracting PDF content:', error);
// // //       return '';
// // //     }
// // //   }

// // //   // Extract content from web articles using Exa with enhanced queries
// // //   async extractWebContent(articleUrls) {
// // //     try {
// // //       const result = await exa.getContents(articleUrls, {
// // //         text: true,
// // //         highlights: {
// // //           numSentences: 15,
// // //           query: "competitive analysis market intelligence product features pricing business model technology stack use cases vendor comparison"
// // //         },
// // //         summary: {
// // //           query: "key insights competitive advantages market trends technology features"
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

// // //   // Validate URL before processing
// // //   isValidUrl(string) {
// // //     try {
// // //       new URL(string);
// // //       return true;
// // //     } catch (_) {
// // //       return false;
// // //     }
// // //   }

// // //   // Process all content sources
// // //   async processContentSources(miData) {
// // //     const allContent = [];
// // //     const tempDir = path.join(process.cwd(), 'temp');

// // //     // Create temp directory if it doesn't exist
// // //     if (!fs.existsSync(tempDir)) {
// // //       fs.mkdirSync(tempDir, { recursive: true });
// // //     }

// // //     try {
// // //       for (const [category, data] of Object.entries(miData)) {
// // //         console.log(`Processing category: ${category}`);

// // //         // Process PDFs
// // //         if (data.pdflinks && data.pdflinks.length > 0) {
// // //           for (const pdfUrl of data.pdflinks) {
// // //             if (!this.isValidUrl(pdfUrl)) {
// // //               console.warn(`Invalid PDF URL: ${pdfUrl}`);
// // //               continue;
// // //             }

// // //             try {
// // //               console.log(`Processing PDF: ${pdfUrl}`);
// // //               const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
// // //               const pdfContent = await this.extractPDFContent(pdfPath);
              
// // //               if (pdfContent && pdfContent.trim().length > 100) {
// // //                 allContent.push({
// // //                   source: pdfUrl,
// // //                   type: 'pdf',
// // //                   category: category,
// // //                   content: pdfContent,
// // //                   metadata: {
// // //                     source_type: 'pdf',
// // //                     category: category,
// // //                     url: pdfUrl,
// // //                     processed_at: new Date().toISOString(),
// // //                     content_length: pdfContent.length
// // //                   }
// // //                 });
// // //               } else {
// // //                 console.warn(`PDF content too short or empty: ${pdfUrl}`);
// // //               }

// // //               // Clean up temp file
// // //               if (fs.existsSync(pdfPath)) {
// // //                 fs.unlinkSync(pdfPath);
// // //               }
// // //             } catch (error) {
// // //               console.error(`Error processing PDF ${pdfUrl}:`, error);
// // //               // Continue with other PDFs even if one fails
// // //             }
// // //           }
// // //         }

// // //         // Process web articles
// // //         if (data.articlelinks && data.articlelinks.length > 0) {
// // //           // Filter valid URLs
// // //           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
// // //           if (validUrls.length === 0) {
// // //             console.warn(`No valid article URLs found for category: ${category}`);
// // //             continue;
// // //           }

// // //           try {
// // //             console.log(`Processing ${validUrls.length} article URLs for category: ${category}`);
// // //             const webContent = await this.extractWebContent(validUrls);
            
// // //             webContent.forEach(item => {
// // //               if (item.content && item.content.trim().length > 100) {
// // //                 allContent.push({
// // //                   source: item.url,
// // //                   type: 'article',
// // //                   category: category,
// // //                   content: item.content,
// // //                   title: item.title,
// // //                   highlights: item.highlights,
// // //                   summary: item.summary,
// // //                   metadata: {
// // //                     source_type: 'article',
// // //                     category: category,
// // //                     url: item.url,
// // //                     title: item.title || '',
// // //                     processed_at: new Date().toISOString(),
// // //                     content_length: item.content.length,
// // //                     has_highlights: !!(item.highlights && item.highlights.length > 0),
// // //                     has_summary: !!(item.summary && item.summary.length > 0)
// // //                   }
// // //                 });
// // //               } else {
// // //                 console.warn(`Article content too short or empty: ${item.url}`);
// // //               }
// // //             });
// // //           } catch (error) {
// // //             console.error(`Error processing articles for category ${category}:`, error);
// // //           }
// // //         }
// // //       }
// // //     } finally {
// // //       // Clean up temp directory
// // //       if (fs.existsSync(tempDir)) {
// // //         fs.rmSync(tempDir, { recursive: true, force: true });
// // //       }
// // //     }

// // //     return allContent;
// // //   }

// // //   // Store content in Pinecone with OpenAI embeddings
// // //   async storeInPinecone(processedContent) {
// // //     try {
// // //       if (!this.index) {
// // //         await this.initializePineconeIndex();
// // //       }

// // //       const vectors = [];
      
// // //       for (const item of processedContent) {
// // //         // Split content into chunks
// // //         const chunks = await this.textSplitter.splitText(item.content);
        
// // //         for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
// // //           const chunk = chunks[chunkIndex];
// // //           const vectorId = `${item.type}_${item.category}_${chunkIndex}_${uuidv4()}`;
          
// // //           try {
// // //             // Generate embedding for the chunk
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
// // //                 category: item.category,
// // //                 title: item.title || '',
// // //                 highlights: JSON.stringify(item.highlights || []),
// // //                 summary: item.summary || '',
// // //                 chunk_length: chunk.length
// // //               }
// // //             });
// // //           } catch (embeddingError) {
// // //             console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
// // //             // Continue with other chunks
// // //           }
// // //         }
// // //       }

// // //       if (vectors.length === 0) {
// // //         throw new Error('No vectors to store in Pinecone');
// // //       }

// // //       // Upsert in batches to avoid rate limits
// // //       const batchSize = 100;
// // //       for (let i = 0; i < vectors.length; i += batchSize) {
// // //         const batch = vectors.slice(i, i + batchSize);
// // //         try {
// // //           await this.index.upsert(batch);
// // //           console.log(`Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} (${batch.length} vectors)`);
          
// // //           // Small delay between batches to avoid rate limiting
// // //           if (i + batchSize < vectors.length) {
// // //             await new Promise(resolve => setTimeout(resolve, 1000));
// // //           }
// // //         } catch (batchError) {
// // //           console.error(`Error upserting batch ${Math.floor(i/batchSize) + 1}:`, batchError);
// // //           // Continue with next batch
// // //         }
// // //       }

// // //       console.log(`Successfully stored ${vectors.length} vectors in Pinecone`);
// // //       return vectors.length;
// // //     } catch (error) {
// // //       console.error('Error storing in Pinecone:', error);
// // //       throw error;
// // //     }
// // //   }

// // //   // Generate analysis questions based on insights configuration
// // //   generateAnalysisQuestions(insights) {
// // //     // Hardcoded specific questions focused on SpotDraft
// // //     const questions = [
// // //       "What is SpotDraft?",
// // //       "What are SpotDraft features?", 
// // //       "Who are SpotDraft target users?",
// // //       "What is SpotDraft tech stack?"
// // //     ];
    
// // //     console.log(`Generated ${questions.length} hardcoded analysis questions focused on SpotDraft`);
// // //     return questions;
// // //   }

// // //   // Perform semantic search and analysis
// // //   async performSemanticAnalysis(questions) {
// // //     const results = [];
    
// // //     for (const question of questions) {
// // //       try {
// // //         console.log(`Analyzing: ${question}`);
        
// // //         // Generate embedding for the question
// // //         const questionEmbedding = await embeddings.embedQuery(question);
        
// // //         // Use Pinecone's query with vector embedding
// // //         const searchResults = await this.index.query({
// // //           vector: questionEmbedding,
// // //           topK: 10,
// // //           includeMetadata: true,
// // //           includeValues: false
// // //         });

// // //         // Extract relevant context from search results
// // //         const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
        
// // //         if (relevantMatches.length === 0) {
// // //           results.push({
// // //             question: question,
// // //             answer: "No highly relevant content found for this question in the processed documents. Consider adding more specific sources or adjusting the question scope.",
// // //             relevantSources: 0,
// // //             averageScore: 0,
// // //             timestamp: new Date().toISOString(),
// // //           });
// // //           continue;
// // //         }

// // //         const context = relevantMatches
// // //           .map(match => match.metadata.chunk_text)
// // //           .join('\n\n');

// // //         // Debug: Show context length and preview
// // //         console.log(`🔍 Context for "${question}": ${context.length} characters from ${relevantMatches.length} chunks`);
// // //         console.log(`🔍 Top 3 chunk scores: ${relevantMatches.slice(0,3).map(m => m.score.toFixed(3)).join(', ')}`);
// // //         console.log(`🔍 Context preview (first 300 chars): ${context.substring(0, 300)}...`);
// // //         console.log(`🔍 Context contains SpotDraft mentions: ${(context.match(/SpotDraft/gi) || []).length} times`);

// // //         // Generate answer using LLM with retrieved context - IMPROVED PROMPT
// // //         const prompt = `You are an expert analyst. Based on the following context from documents, provide a comprehensive and detailed analysis for this question: "${question}"

// // // CONTEXT FROM DOCUMENTS:
// // // ${context}

// // // INSTRUCTIONS:
// // // - Provide a thorough, detailed response with specific information from the context
// // // - Include all relevant details, features, specifications, and examples mentioned
// // // - Structure your response clearly with headings and bullet points
// // // - Quote specific details and numbers from the context when available
// // // - Make your response comprehensive - aim for 300-800 words with detailed information
// // // - Focus on being informative and complete rather than brief

// // // DETAILED RESPONSE:`;

// // //                 console.log(`📤 SENDING TO LLM - Prompt length: ${prompt.length} characters`);
// // //         console.log(`📤 Question: "${question}"`);
// // //         console.log(`📤 Context length: ${context.length} characters`);

// // //         try {
// // //           // Use ChatOpenAI invoke method
// // //           const response = await openai.invoke(prompt);
          
// // //           // Debug: Show LLM response details
// // //           console.log(`📥 RECEIVED FROM LLM - Response length: ${response.content.length} characters`);
// // //           console.log(`📥 Response starts with: "${response.content.substring(0, 100)}..."`);
          
// // //           const responseText = response.content || response;
          
// // //           if (responseText.length < 100) {
// // //             console.log(`⚠️  WARNING: Very short response! Full response: "${responseText}"`);
// // //           }

// // //           results.push({
// // //             question: question,
// // //             answer: responseText,
// // //             relevantSources: relevantMatches.length,
// // //             averageScore: relevantMatches.reduce((acc, match) => acc + match.score, 0) / relevantMatches.length,
// // //             timestamp: new Date().toISOString(),
// // //           });
// // //         } catch (llmError) {
// // //           console.error(`❌ LLM Error for question "${question}":`, llmError);
// // //           results.push({
// // //             question: question,
// // //             answer: `Error generating response: ${llmError.message}`,
// // //             relevantSources: relevantMatches.length,
// // //             averageScore: relevantMatches.reduce((acc, match) => acc + match.score, 0) / relevantMatches.length,
// // //             timestamp: new Date().toISOString(),
// // //           });
// // //         }

// // //         // Small delay between LLM calls to avoid rate limiting
// // //         await new Promise(resolve => setTimeout(resolve, 500));

// // //       } catch (error) {
// // //         console.error(`Error analyzing question: ${question}`, error);
// // //         results.push({
// // //           question: question,
// // //           answer: `Error processing question: ${error.message}. Please try again or contact support if the issue persists.`,
// // //           relevantSources: 0,
// // //           averageScore: 0,
// // //           timestamp: new Date().toISOString(),
// // //         });
// // //       }
// // //     }

// // //     return results;
// // //   }

// // //   // Main analysis workflow
// // //   async runAnalysis(body) {
// // //     try {
// // //       const { insights, miData } = body;
      
// // //       // Validate input
// // //       if (!insights || !miData) {
// // //         throw new Error('Missing required fields: insights and miData');
// // //       }

// // //       console.log('Starting AI analysis workflow with OpenAI embeddings...');
      
// // //       // Step 1: Initialize Pinecone with standard setup
// // //       console.log('Step 1: Initializing Pinecone...');
// // //       await this.initializePineconeIndex();
      
// // //       // Step 2: Process content sources (PDFs and articles)
// // //       console.log('Step 2: Processing content sources...');
// // //       const processedContent = await this.processContentSources(miData);
      
// // //       if (processedContent.length === 0) {
// // //         return {
// // //           success: false,
// // //           error: 'No content could be processed from the provided sources. Please check URLs and try again.',
// // //           processedSources: 0,
// // //           vectorsStored: 0,
// // //           questionsAnalyzed: 0,
// // //           analysis: [],
// // //           summary: {
// // //             categories: Object.keys(miData),
// // //             totalPDFs: Object.values(miData).reduce((acc, data) => acc + (data.pdflinks?.length || 0), 0),
// // //             totalArticles: Object.values(miData).reduce((acc, data) => acc + (data.articlelinks?.length || 0), 0),
// // //             averageRelevanceScore: 0
// // //           }
// // //         };
// // //       }
      
// // //       console.log(`Processed ${processedContent.length} content items`);
      
// // //       // Step 3: Store in Pinecone with OpenAI embeddings
// // //       console.log('Step 3: Storing content with OpenAI embeddings...');
// // //       const vectorCount = await this.storeInPinecone(processedContent);
      
// // //       // Step 4: Generate analysis questions
// // //       console.log('Step 4: Generating analysis questions...');
// // //       const questions = this.generateAnalysisQuestions(insights);
      
// // //       console.log(`Generated ${questions.length} analysis questions`);
      
// // //       // Step 5: Perform semantic search and analysis
// // //       console.log('Step 5: Performing semantic analysis...');
// // //       const analysisResults = await this.performSemanticAnalysis(questions);
      
// // //       // Calculate summary statistics
// // //       const validResults = analysisResults.filter(result => result.averageScore > 0);
// // //       const averageRelevanceScore = validResults.length > 0 
// // //         ? validResults.reduce((acc, result) => acc + result.averageScore, 0) / validResults.length 
// // //         : 0;

// // //       return {
// // //         success: true,
// // //         processedSources: processedContent.length,
// // //         vectorsStored: vectorCount,
// // //         questionsAnalyzed: questions.length,
// // //         analysis: analysisResults,
// // //         summary: {
// // //           categories: Object.keys(miData),
// // //           totalPDFs: Object.values(miData).reduce((acc, data) => acc + (data.pdflinks?.length || 0), 0),
// // //           totalArticles: Object.values(miData).reduce((acc, data) => acc + (data.articlelinks?.length || 0), 0),
// // //           averageRelevanceScore: Math.round(averageRelevanceScore * 100) / 100,
// // //           successfulAnalyses: validResults.length,
// // //           processingTime: new Date().toISOString()
// // //         }
// // //       };
      
// // //     } catch (error) {
// // //       console.error('Analysis workflow error:', error);
// // //       throw error;
// // //     }
// // //   }
// // // }

// // // // Updated API handler
// // // export async function POST(request) {
// // //   try {
// // //     const body = await request.json();
    
// // //     console.log('=== MI ANALYSE API CALLED ===');
// // //     console.log('Request body structure:', {
// // //       hasInsights: !!body.insights,
// // //       hasMiData: !!body.miData,
// // //       insightsKeys: body.insights ? Object.keys(body.insights) : [],
// // //       miDataKeys: body.miData ? Object.keys(body.miData) : []
// // //     });
    
// // //     // Initialize and run AI analysis workflow
// // //     const workflow = new AIAnalysisWorkflow();
// // //     const analysisResults = await workflow.runAnalysis(body);
    
// // //     console.log('=== ANALYSIS COMPLETED ===');
// // //     console.log(`Success: ${analysisResults.success}`);
// // //     console.log(`Processed ${analysisResults.processedSources} sources`);
// // //     console.log(`Stored ${analysisResults.vectorsStored} vectors`);
// // //     console.log(`Generated ${analysisResults.questionsAnalyzed} insights`);
// // //     console.log(`Average relevance score: ${analysisResults.summary.averageRelevanceScore}`);
// // //     console.log('=== END MI ANALYSE ===');

// // //     return NextResponse.json(
// // //       { 
// // //         message: analysisResults.success 
// // //           ? 'Analysis completed successfully' 
// // //           : 'Analysis completed with warnings',
// // //         timestamp: new Date().toISOString(),
// // //         ...analysisResults
// // //       },
// // //       { status: analysisResults.success ? 200 : 206 } // 206 for partial success
// // //     );
// // //   } catch (error) {
// // //     console.error('Error in MI Analyse API:', error);
// // //     return NextResponse.json(
// // //       { 
// // //         success: false,
// // //         error: 'Failed to process analysis data',
// // //         details: error.message,
// // //         timestamp: new Date().toISOString()
// // //       },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { Pinecone } from '@pinecone-database/pinecone';
// // import { ChatOpenAI } from '@langchain/openai';
// // import { OpenAIEmbeddings } from '@langchain/openai';
// // import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// // import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// // import Exa from 'exa-js';
// // import fs from 'fs';
// // import path from 'path';
// // import { v4 as uuidv4 } from 'uuid';

// // // Initialize services
// // const pc = new Pinecone({
// //   apiKey: process.env.PINECONE_API_KEY
// // });

// // const exa = new Exa(process.env.EXA_API_KEY);
// // const openai = new ChatOpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// //   temperature: 0.2,
// //   modelName: 'gpt-3.5-turbo',
// //   maxTokens: 2000,
// // });

// // // Use OpenAI embeddings
// // const embeddings = new OpenAIEmbeddings({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // Legal software functionality constraints
// // const FUNCTIONALITY_CONSTRAINTS = `
// // Focus only on these legal software categories: Contract Lifecycle Management, Legal AI, Document Management System, E-discovery, IP Management, Legal Research, Litigation Management and Analytics.

// // Use only these functionalities and lifecycle stages:

// // Contract Lifecycle Management: Create → Negotiation → Authentication → Execute → Store → Tracking
// // Legal AI: Data Import → Structuring → Analysis → Review → Workflow → Optimization  
// // Document Management System: Capture → Change Management → Review → Organize → Access Management → Retrieval
// // E-discovery: Discover → Preserve → Acquire → Examine → Evaluate → Present
// // IP Management: Cataloging → Analysis → Protection → Monitoring → Enforcement → Reporting
// // Legal Research: Query Identification → Source and Type Selection → Filtration and Sorting → Data Extraction → Data Analysis and Organization → Storage or Retrieval
// // Litigation Management and Analytics: Intake → Strategize → Preparation → Litigation Support → Analytics → Outcome Evaluation

// // Do not create new categories or functionalities outside of this scope.
// // `;

// // class AdvancedAIAnalysisWorkflow {
// //   constructor() {
// //     this.textSplitter = new RecursiveCharacterTextSplitter({
// //       chunkSize: 1000,
// //       chunkOverlap: 200,
// //     });
// //     this.categoryIndexes = new Map(); // Store category-specific indexes
// //   }

// //   // Download PDF from URL using fetch
// //   async downloadPDF(pdfUrl, tempDir) {
// //     try {
// //       console.log(`📄 Downloading PDF: ${pdfUrl}`);
      
// //       const response = await fetch(pdfUrl, {
// //         method: 'GET',
// //         headers: {
// //           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
// //         }
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const buffer = await response.arrayBuffer();
// //       const fileName = `${uuidv4()}.pdf`;
// //       const filePath = path.join(tempDir, fileName);
      
// //       fs.writeFileSync(filePath, Buffer.from(buffer));
// //       return filePath;
// //     } catch (error) {
// //       console.error(`Error downloading PDF from ${pdfUrl}:`, error);
// //       throw error;
// //     }
// //   }

// //   // Extract text from PDF
// //   async extractPDFContent(pdfPath) {
// //     try {
// //       const loader = new PDFLoader(pdfPath);
// //       const docs = await loader.load();
// //       const content = docs.map(doc => doc.pageContent).join('\n\n');
// //       console.log(`📄 PDF extracted: ${content.length} characters`);
// //       return content;
// //     } catch (error) {
// //       console.error('Error extracting PDF content:', error);
// //       return '';
// //     }
// //   }

// //   // Extract content from web articles using Exa
// //   async extractWebContent(articleUrls) {
// //     try {
// //       const result = await exa.getContents(articleUrls, {
// //         text: true,
// //         highlights: {
// //           numSentences: 15,
// //           query: "legal software features functionality technology stack use cases competitive analysis"
// //         },
// //         summary: {
// //           query: "key features competitive advantages market positioning"
// //         }
// //       });

// //       return result.results.map(item => ({
// //         url: item.url,
// //         title: item.title,
// //         content: item.text,
// //         highlights: item.highlights,
// //         summary: item.summary
// //       }));
// //     } catch (error) {
// //       console.error('Error extracting web content:', error);
// //       return [];
// //     }
// //   }

// //   // Validate URL
// //   isValidUrl(string) {
// //     try {
// //       new URL(string);
// //       return true;
// //     } catch (_) {
// //       return false;
// //     }
// //   }

// //   // Process content sources for a specific category
// //   async processContentForCategory(categoryName, miData) {
// //     const allContent = [];
// //     const tempDir = path.join(process.cwd(), 'temp');

// //     if (!fs.existsSync(tempDir)) {
// //       fs.mkdirSync(tempDir, { recursive: true });
// //     }

// //     try {
// //       console.log(`🔍 Processing content for category: ${categoryName}`);

// //       // Process PDFs
// //       if (miData.pdflinks && miData.pdflinks.length > 0) {
// //         for (const pdfUrl of miData.pdflinks) {
// //           if (!this.isValidUrl(pdfUrl)) continue;

// //           try {
// //             const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
// //             const pdfContent = await this.extractPDFContent(pdfPath);
            
// //             if (pdfContent && pdfContent.trim().length > 100) {
// //               allContent.push({
// //                 source: pdfUrl,
// //                 type: 'pdf',
// //                 category: categoryName,
// //                 content: pdfContent,
// //                 metadata: {
// //                   source_type: 'pdf',
// //                   category: categoryName,
// //                   url: pdfUrl,
// //                   processed_at: new Date().toISOString(),
// //                   content_length: pdfContent.length
// //                 }
// //               });
// //             }

// //             if (fs.existsSync(pdfPath)) {
// //               fs.unlinkSync(pdfPath);
// //             }
// //           } catch (error) {
// //             console.error(`Error processing PDF ${pdfUrl}:`, error);
// //           }
// //         }
// //       }

// //       // Process web articles
// //       if (miData.articlelinks && miData.articlelinks.length > 0) {
// //         const validUrls = miData.articlelinks.filter(url => this.isValidUrl(url));
        
// //         if (validUrls.length > 0) {
// //           try {
// //             const webContent = await this.extractWebContent(validUrls);
            
// //             webContent.forEach(item => {
// //               if (item.content && item.content.trim().length > 100) {
// //                 allContent.push({
// //                   source: item.url,
// //                   type: 'article',
// //                   category: categoryName,
// //                   content: item.content,
// //                   title: item.title,
// //                   highlights: item.highlights,
// //                   summary: item.summary,
// //                   metadata: {
// //                     source_type: 'article',
// //                     category: categoryName,
// //                     url: item.url,
// //                     title: item.title || '',
// //                     processed_at: new Date().toISOString(),
// //                     content_length: item.content.length
// //                   }
// //                 });
// //               }
// //             });
// //           } catch (error) {
// //             console.error(`Error processing articles for category ${categoryName}:`, error);
// //           }
// //         }
// //       }
// //     } finally {
// //       if (fs.existsSync(tempDir)) {
// //         fs.rmSync(tempDir, { recursive: true, force: true });
// //       }
// //     }

// //     return allContent;
// //   }

// //   // Create category-specific Pinecone index and store content
// //   async createCategoryRAG(categoryName, processedContent) {
// //     try {
// //       const indexName = `mi-analysis-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
// //       // Check if index exists
// //       const indexList = await pc.listIndexes();
// //       const indexExists = indexList.indexes?.some(index => index.name === indexName);

// //       if (!indexExists) {
// //         console.log(`📊 Creating Pinecone index for category: ${categoryName}`);
// //         await pc.createIndex({
// //           name: indexName,
// //           dimension: 1536,
// //           metric: 'cosine',
// //           spec: {
// //             serverless: {
// //               cloud: 'aws',
// //               region: 'us-east-1'
// //             }
// //           },
// //           waitUntilReady: true,
// //         });
// //       }

// //       const index = pc.index(indexName);
// //       this.categoryIndexes.set(categoryName, index);

// //       // Store content in vectors
// //       const vectors = [];
      
// //       for (const item of processedContent) {
// //         const chunks = await this.textSplitter.splitText(item.content);
        
// //         for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
// //           const chunk = chunks[chunkIndex];
// //           const vectorId = `${item.type}_${chunkIndex}_${uuidv4()}`;
          
// //           try {
// //             const embedding = await embeddings.embedQuery(chunk);
            
// //             vectors.push({
// //               id: vectorId,
// //               values: embedding,
// //               metadata: {
// //                 ...item.metadata,
// //                 chunk_index: chunkIndex,
// //                 chunk_text: chunk,
// //                 source: item.source,
// //                 type: item.type,
// //                 category: categoryName,
// //                 title: item.title || '',
// //                 chunk_length: chunk.length
// //               }
// //             });
// //           } catch (embeddingError) {
// //             console.error(`Error generating embedding for chunk ${chunkIndex}:`, embeddingError);
// //           }
// //         }
// //       }

// //       if (vectors.length > 0) {
// //         const batchSize = 100;
// //         for (let i = 0; i < vectors.length; i += batchSize) {
// //           const batch = vectors.slice(i, i + batchSize);
// //           await index.upsert(batch);
// //           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${categoryName}`);
          
// //           if (i + batchSize < vectors.length) {
// //             await new Promise(resolve => setTimeout(resolve, 1000));
// //           }
// //         }
// //       }

// //       console.log(`✅ Created RAG for ${categoryName} with ${vectors.length} vectors`);
// //       return vectors.length;
// //     } catch (error) {
// //       console.error(`Error creating RAG for ${categoryName}:`, error);
// //       throw error;
// //     }
// //   }

// //   // Query category-specific RAG
// //   async queryRAG(categoryName, question) {
// //     try {
// //       const index = this.categoryIndexes.get(categoryName);
// //       if (!index) {
// //         throw new Error(`No RAG index found for category: ${categoryName}`);
// //       }

// //       const questionEmbedding = await embeddings.embedQuery(question);
      
// //       const searchResults = await index.query({
// //         vector: questionEmbedding,
// //         topK: 8,
// //         includeMetadata: true,
// //         includeValues: false
// //       });

// //       const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
// //       if (relevantMatches.length === 0) {
// //         return "No relevant content found in the processed documents for this question.";
// //       }

// //       const context = relevantMatches
// //         .map(match => match.metadata.chunk_text)
// //         .join('\n\n');

// //       const prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // CONTEXT:
// // ${context}

// // Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

// // RESPONSE:`;

// //       const response = await openai.invoke(prompt);
// //       return response.content || response;
      
// //     } catch (error) {
// //       console.error(`Error querying RAG for ${categoryName}:`, error);
// //       return `Error querying RAG: ${error.message}`;
// //     }
// //   }

// //   // Mock database query (you'll replace with actual Prisma queries)
// //   async queryDatabase(fields, prompt) {
// //     try {
// //       // TODO: Replace with actual Prisma query
// //       // const products = await prisma.legalSoftware.findMany({
// //       //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
// //       // });

// //       // Mock data for demonstration
// //       const mockData = {
// //         caseStudies: "Case Study 1: SpotDraft reduced contract cycle time by 90%. Case Study 2: ContractWorks improved compliance by 85%.",
// //         valueMetrics: "SpotDraft: 1.5M hours saved, ContractWorks: 500K contracts processed",
// //         vendorComments: "SpotDraft: 'Leading AI-powered solution', ContractWorks: 'Simple and effective'",
// //         productName: "SpotDraft, ContractWorks, PandaDoc, DocuSign CLM",
// //         description: "AI-powered contract lifecycle management platforms with automation capabilities",
// //         technologyStack: "Cloud-based SaaS, AI/ML, API integrations, Enterprise security"
// //       };

// //       const contextData = fields.map(field => `${field}: ${mockData[field] || 'Not available'}`).join('\n');

// //       const dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // DATABASE INFORMATION:
// // ${contextData}

// // Provide a structured response using only the information provided above.

// // RESPONSE:`;

// //       const response = await openai.invoke(dbPrompt);
// //       return response.content || response;
      
// //     } catch (error) {
// //       console.error('Error querying database:', error);
// //       return `Error querying database: ${error.message}`;
// //     }
// //   }

// //   // Format response based on type
// //   formatResponse(ragResponse, dbResponse, type) {
// //     const combinedContent = `RAG Analysis:\n${ragResponse}\n\nDatabase Analysis:\n${dbResponse}`;
    
// //     switch (type) {
// //       case 'bar':
// //         // Extract data for bar chart format
// //         const matches = combinedContent.match(/(\w+):\s*(\d+)/g) || [];
// //         return matches.join(', ') || 'SpotDraft: 8, ContractWorks: 6, PandaDoc: 4, DocuSign: 5';
        
// //       case 'point':
// //         // Format as bullet points
// //         const lines = combinedContent.split('\n').filter(line => line.trim());
// //         const points = lines.slice(0, 8).map(line => `• ${line.trim()}`);
// //         return points.join('\n');
        
// //       default:
// //         return combinedContent;
// //     }
// //   }

// //   // Process insights structure
// //   async processInsights(insights, miData) {
// //     const results = { ...insights };
    
// //     console.log('🚀 Starting Advanced AI Analysis Workflow...');
    
// //     // Iterate through main categories
// //     for (const [mainCategory, categoryConfig] of Object.entries(insights)) {
// //       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
// //       const dataHeaderName = categoryConfig.data_header_name;
// //       console.log(`🔍 Looking for data header: ${dataHeaderName}`);
      
// //       // Find matching miData
// //       const matchingMiData = miData[dataHeaderName];
// //       if (!matchingMiData) {
// //         console.log(`⚠️  No matching miData found for: ${dataHeaderName}`);
// //         continue;
// //       }
      
// //       // Create category-specific RAG
// //       console.log(`📊 Creating RAG for category: ${mainCategory}`);
// //       const processedContent = await this.processContentForCategory(mainCategory, matchingMiData);
      
// //       if (processedContent.length > 0) {
// //         await this.createCategoryRAG(mainCategory, processedContent);
        
// //         // Process sub-categories
// //         for (const [subCategory, subConfig] of Object.entries(categoryConfig)) {
// //           if (subCategory === 'data_header_name') continue;
          
// //           console.log(`\n🔧 Processing sub-category: ${subCategory}`);
          
// //           // Process objects within sub-category (graph, content, insights, etc.)
// //           for (const [objectKey, objectConfig] of Object.entries(subConfig)) {
// //             if (objectKey === 'databaseCollection') continue;
            
// //             console.log(`  📝 Processing object: ${objectKey}`);
            
// //             const { prompt, fields, type, heading } = objectConfig;
            
// //             if (prompt && fields) {
// //               console.log(`    🤖 Querying: "${prompt}"`);
              
// //               // Query RAG
// //               const ragResponse = await this.queryRAG(mainCategory, prompt);
              
// //               // Query Database
// //               const dbResponse = await this.queryDatabase(fields, prompt);
              
// //               // Format combined response
// //               const finalResponse = this.formatResponse(ragResponse, dbResponse, type);
              
// //               // Update results structure
// //               results[mainCategory][subCategory][objectKey].response = finalResponse;
              
// //               console.log(`    ✅ Generated response (${finalResponse.length} chars)`);
// //             }
// //           }
// //         }
// //       } else {
// //         console.log(`⚠️  No content processed for category: ${mainCategory}`);
// //       }
// //     }
    
// //     return results;
// //   }

// //   // Main analysis workflow
// //   async runAnalysis(body) {
// //     try {
// //       const { insights, miData } = body;
      
// //       if (!insights || !miData) {
// //         throw new Error('Missing required fields: insights and miData');
// //       }

// //       console.log('=== ADVANCED MI ANALYSIS STARTED ===');
      
// //       // Process the complete insights structure
// //       const enhancedInsights = await this.processInsights(insights, miData);
      
// //       return {
// //         success: true,
// //         insights: enhancedInsights,
// //         summary: {
// //           totalCategories: Object.keys(insights).length,
// //           processedAt: new Date().toISOString(),
// //           message: 'Analysis completed with RAG and database integration'
// //         }
// //       };
      
// //     } catch (error) {
// //       console.error('Analysis workflow error:', error);
// //       throw error;
// //     }
// //   }
// // }

// // // API handler
// // export async function POST(request) {
// //   try {
// //     const body = await request.json();
    
// //     console.log('=== ADVANCED MI ANALYSE API CALLED ===');
// //     console.log('Request structure:', {
// //       hasInsights: !!body.insights,
// //       hasMiData: !!body.miData,
// //       mainCategories: body.insights ? Object.keys(body.insights) : [],
// //       miDataKeys: body.miData ? Object.keys(body.miData) : []
// //     });
    
// //     const workflow = new AdvancedAIAnalysisWorkflow();
// //     const analysisResults = await workflow.runAnalysis(body);
    
// //     console.log('\n=== ANALYSIS COMPLETED ===');
// //     console.log('📊 Enhanced Insights Structure:');
// //     console.log(JSON.stringify(analysisResults.insights, null, 2));
// //     console.log('=== END ADVANCED MI ANALYSE ===');

// //     return NextResponse.json(
// //       { 
// //         message: 'Advanced analysis completed successfully',
// //         timestamp: new Date().toISOString(),
// //         ...analysisResults
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error('Error in Advanced MI Analyse API:', error);
// //     return NextResponse.json(
// //       { 
// //         success: false,
// //         error: 'Failed to process advanced analysis',
// //         details: error.message,
// //         timestamp: new Date().toISOString()
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }
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
//     this.categoryIndexes = new Map(); // Store category-specific indexes
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

//   // Process content sources for a specific category
//   async processContentForCategory(categoryName, miData) {
//     const allContent = [];
//     const tempDir = path.join(process.cwd(), 'temp');

//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }

//     try {
//       console.log(`🔍 Processing content for category: ${categoryName}`);

//       // Process PDFs
//       if (miData.pdflinks && miData.pdflinks.length > 0) {
//         for (const pdfUrl of miData.pdflinks) {
//           if (!this.isValidUrl(pdfUrl)) continue;

//           try {
//             const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
//             const pdfContent = await this.extractPDFContent(pdfPath);
            
//             if (pdfContent && pdfContent.trim().length > 100) {
//               allContent.push({
//                 source: pdfUrl,
//                 type: 'pdf',
//                 category: categoryName,
//                 content: pdfContent,
//                 metadata: {
//                   source_type: 'pdf',
//                   category: categoryName,
//                   url: pdfUrl,
//                   processed_at: new Date().toISOString(),
//                   content_length: pdfContent.length
//                 }
//               });
//             }

//             if (fs.existsSync(pdfPath)) {
//               fs.unlinkSync(pdfPath);
//             }
//           } catch (error) {
//             console.error(`Error processing PDF ${pdfUrl}:`, error);
//           }
//         }
//       }

//       // Process web articles
//       if (miData.articlelinks && miData.articlelinks.length > 0) {
//         const validUrls = miData.articlelinks.filter(url => this.isValidUrl(url));
        
//         if (validUrls.length > 0) {
//           try {
//             const webContent = await this.extractWebContent(validUrls);
            
//             webContent.forEach(item => {
//               if (item.content && item.content.trim().length > 100) {
//                 allContent.push({
//                   source: item.url,
//                   type: 'article',
//                   category: categoryName,
//                   content: item.content,
//                   title: item.title,
//                   highlights: item.highlights,
//                   summary: item.summary,
//                   metadata: {
//                     source_type: 'article',
//                     category: categoryName,
//                     url: item.url,
//                     title: item.title || '',
//                     processed_at: new Date().toISOString(),
//                     content_length: item.content.length
//                   }
//                 });
//               }
//             });
//           } catch (error) {
//             console.error(`Error processing articles for category ${categoryName}:`, error);
//           }
//         }
//       }
//     } finally {
//       if (fs.existsSync(tempDir)) {
//         fs.rmSync(tempDir, { recursive: true, force: true });
//       }
//     }

//     return allContent;
//   }

//   // Create category-specific Pinecone index and store content
//   async createCategoryRAG(categoryName, processedContent) {
//     try {
//       const indexName = `mi-analysis-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
//       // Check if index exists
//       const indexList = await pc.listIndexes();
//       const indexExists = indexList.indexes?.some(index => index.name === indexName);

//       if (!indexExists) {
//         console.log(`📊 Creating Pinecone index for category: ${categoryName}`);
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
//       this.categoryIndexes.set(categoryName, index);

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
//                 category: categoryName,
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
//           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${categoryName}`);
          
//           if (i + batchSize < vectors.length) {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//           }
//         }
//       }

//       console.log(`✅ Created RAG for ${categoryName} with ${vectors.length} vectors`);
//       return vectors.length;
//     } catch (error) {
//       console.error(`Error creating RAG for ${categoryName}:`, error);
//       throw error;
//     }
//   }

//   // Query category-specific RAG
//   async queryRAG(categoryName, question, responseType = 'default') {
//     try {
//       const index = this.categoryIndexes.get(categoryName);
//       if (!index) {
//         throw new Error(`No RAG index found for category: ${categoryName}`);
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
//       console.error(`Error querying RAG for ${categoryName}:`, error);
//       return `Error querying RAG: ${error.message}`;
//     }
//   }

//   // Mock database query (you'll replace with actual Prisma queries)
//   async queryDatabase(fields, prompt, responseType = 'default') {
//     try {
//       // TODO: Replace with actual Prisma query
//       // const products = await prisma.legalSoftware.findMany({
//       //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
//       // });

//       // Mock data for demonstration
//       const mockData = {
//         caseStudies: "Case Study 1: SpotDraft reduced contract cycle time by 90%. Case Study 2: ContractWorks improved compliance by 85%.",
//         valueMetrics: "SpotDraft: 1.5M hours saved, ContractWorks: 500K contracts processed",
//         vendorComments: "SpotDraft: 'Leading AI-powered solution', ContractWorks: 'Simple and effective'",
//         productName: "SpotDraft, ContractWorks, PandaDoc, DocuSign CLM",
//         description: "AI-powered contract lifecycle management platforms with automation capabilities",
//         technologyStack: "Cloud-based SaaS, AI/ML, API integrations, Enterprise security",
//         slug: "spotdraft, contractworks, pandadoc, docusign-clm",
//         topUseCases: "Contract automation, Legal team collaboration, Compliance management, Document workflow",
//         criticalOpinions: "UI complexity issues, Template editing limitations, Pricing transparency concerns",
//         isPremium: "Premium tier available for enterprise features",
//         tag: "CLM, AI-powered, Enterprise, Cloud-based"
//       };

//       const contextData = fields.map(field => `${field}: ${mockData[field] || 'Not available'}`).join('\n');

//       let dbPrompt;
      
//       if (responseType === 'point') {
//         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// DATABASE INFORMATION:
// ${contextData}

// IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// Example format:
// • Point one about the topic
// • Point two with specific details  
// • Point three with key insights
// • Point four with important information

// BULLET POINT RESPONSE:`;
//       } else {
//         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// DATABASE INFORMATION:
// ${contextData}

// Provide a structured response using only the information provided above.

// RESPONSE:`;
//       }

//       const response = await openai.invoke(dbPrompt);
//       return response.content || response;
      
//     } catch (error) {
//       console.error('Error querying database:', error);
//       return `Error querying database: ${error.message}`;
//     }
//   }

//   // Format response based on type
//   formatResponse(ragResponse, dbResponse, type) {
//     switch (type) {
//       case 'bar':
//         // Extract data for bar chart format
//         const combinedContent = `${ragResponse}\n${dbResponse}`;
//         const matches = combinedContent.match(/(\w+):\s*(\d+)/g) || [];
//         if (matches.length > 0) {
//           return matches.join(', ');
//         }
//         // Fallback: extract tool names and assign counts
//         const toolNames = combinedContent.match(/\b[A-Z][a-z]+(?:[A-Z][a-z]+)*\b/g) || [];
//         const uniqueTools = [...new Set(toolNames)].slice(0, 5);
//         return uniqueTools.map((tool, index) => `${tool}: ${Math.floor(Math.random() * 10) + 1}`).join(', ');
        
//       case 'point':
//         // Extract bullet points from both responses
//         const allPoints = [];
        
//         // Parse RAG response for bullet points
//         if (ragResponse && ragResponse !== "No relevant content found in the processed documents for this question.") {
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
        
//         // Parse Database response for bullet points
//         if (dbResponse && dbResponse.trim().length > 0) {
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
        
//         // If still no points, provide defaults
//         if (allPoints.length === 0) {
//           allPoints.push(
//             "Contract Lifecycle Management is the dominant category",
//             "AI-powered features are increasingly popular", 
//             "Cloud-based SaaS solutions are preferred",
//             "Integration capabilities are essential features"
//           );
//         }
        
//         // Clean up points and return array (max 6 points)
//         const cleanPoints = allPoints
//           .map(point => point.trim())
//           .filter(point => point.length > 0)
//           .slice(0, 6);
        
//         return cleanPoints;
        
//       default:
//         return `${ragResponse}\n\n${dbResponse}`;
//     }
//   }

//   // Process insights structure
//   async processInsights(insights, miData) {
//     const results = { ...insights };
    
//     console.log('🚀 Starting Advanced AI Analysis Workflow...');
    
//     // Iterate through main categories
//     for (const [mainCategory, categoryConfig] of Object.entries(insights)) {
//       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
//       const dataHeaderName = categoryConfig.data_header_name;
//       console.log(`🔍 Looking for data header: ${dataHeaderName}`);
      
//       // Find matching miData
//       const matchingMiData = miData[dataHeaderName];
//       if (!matchingMiData) {
//         console.log(`⚠️  No matching miData found for: ${dataHeaderName}`);
//         continue;
//       }
      
//       // Create category-specific RAG
//       console.log(`📊 Creating RAG for category: ${mainCategory}`);
//       const processedContent = await this.processContentForCategory(mainCategory, matchingMiData);
      
//       if (processedContent.length > 0) {
//         await this.createCategoryRAG(mainCategory, processedContent);
        
//         // Process sub-categories
//         for (const [subCategory, subConfig] of Object.entries(categoryConfig)) {
//           if (subCategory === 'data_header_name') continue;
          
//           console.log(`\n🔧 Processing sub-category: ${subCategory}`);
          
//           // Process objects within sub-category (graph, content, insights, etc.)
//           for (const [objectKey, objectConfig] of Object.entries(subConfig)) {
//             if (objectKey === 'databaseCollection') continue;
            
//             console.log(`  📝 Processing object: ${objectKey}`);
            
//             const { prompt, fields, type, heading } = objectConfig;
            
//             if (prompt && fields) {
//               console.log(`    🤖 Querying: "${prompt}"`);
              
//               // Query RAG with response type
//               const ragResponse = await this.queryRAG(mainCategory, prompt, type);
              
//               // Query Database with response type
//               const dbResponse = await this.queryDatabase(fields, prompt, type);
              
//               // Format combined response
//               const finalResponse = this.formatResponse(ragResponse, dbResponse, type);
              
//               // Update results structure
//               results[mainCategory][subCategory][objectKey].response = finalResponse;
              
//               console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
//             }
//           }
//         }
//       } else {
//         console.log(`⚠️  No content processed for category: ${mainCategory}`);
//       }
//     }
    
//     return results;
//   }

//   // Main analysis workflow
//   async runAnalysis(body) {
//     try {
//       const { insights, miData } = body;
      
//       if (!insights || !miData) {
//         throw new Error('Missing required fields: insights and miData');
//       }

//       console.log('=== ADVANCED MI ANALYSIS STARTED ===');
      
//       // Process the complete insights structure
//       const enhancedInsights = await this.processInsights(insights, miData);
      
//       return {
//         success: true,
//         insights: enhancedInsights,
//         summary: {
//           totalCategories: Object.keys(insights).length,
//           processedAt: new Date().toISOString(),
//           message: 'Analysis completed with RAG and database integration'
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
    
//     console.log('=== ADVANCED MI ANALYSE API CALLED ===');
//     console.log('Request structure:', {
//       hasInsights: !!body.insights,
//       hasMiData: !!body.miData,
//       mainCategories: body.insights ? Object.keys(body.insights) : [],
//       miDataKeys: body.miData ? Object.keys(body.miData) : []
//     });
    
//     const workflow = new AdvancedAIAnalysisWorkflow();
//     const analysisResults = await workflow.runAnalysis(body);
    
//     console.log('\n=== ANALYSIS COMPLETED ===');
//     console.log('📊 Enhanced Insights Structure:');
//     console.log(JSON.stringify(analysisResults.insights, null, 2));
//     console.log('=== END ADVANCED MI ANALYSE ===');

//     return NextResponse.json(
//       { 
//         message: 'Advanced analysis completed successfully',
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

// Initialize services
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const exa = new Exa(process.env.EXA_API_KEY);
const openai = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
  modelName: 'gpt-3.5-turbo',
  maxTokens: 2000,
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
    this.categoryIndexes = new Map(); // Store category-specific indexes
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

  // Process content sources for a specific category
  async processContentForCategory(categoryName, miData) {
    const allContent = [];
    const tempDir = path.join(process.cwd(), 'temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      console.log(`🔍 Processing content for category: ${categoryName}`);

      // Process PDFs
      if (miData.pdflinks && miData.pdflinks.length > 0) {
        for (const pdfUrl of miData.pdflinks) {
          if (!this.isValidUrl(pdfUrl)) continue;

          try {
            const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
            const pdfContent = await this.extractPDFContent(pdfPath);
            
            if (pdfContent && pdfContent.trim().length > 100) {
              allContent.push({
                source: pdfUrl,
                type: 'pdf',
                category: categoryName,
                content: pdfContent,
                metadata: {
                  source_type: 'pdf',
                  category: categoryName,
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
            console.error(`Error processing PDF ${pdfUrl}:`, error);
          }
        }
      }

      // Process web articles
      if (miData.articlelinks && miData.articlelinks.length > 0) {
        const validUrls = miData.articlelinks.filter(url => this.isValidUrl(url));
        
        if (validUrls.length > 0) {
          try {
            const webContent = await this.extractWebContent(validUrls);
            
            webContent.forEach(item => {
              if (item.content && item.content.trim().length > 100) {
                allContent.push({
                  source: item.url,
                  type: 'article',
                  category: categoryName,
                  content: item.content,
                  title: item.title,
                  highlights: item.highlights,
                  summary: item.summary,
                  metadata: {
                    source_type: 'article',
                    category: categoryName,
                    url: item.url,
                    title: item.title || '',
                    processed_at: new Date().toISOString(),
                    content_length: item.content.length
                  }
                });
              }
            });
          } catch (error) {
            console.error(`Error processing articles for category ${categoryName}:`, error);
          }
        }
      }
    } finally {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }

    return allContent;
  }

  // Create category-specific Pinecone index and store content
  async createCategoryRAG(categoryName, processedContent) {
    try {
      const indexName = `mi-analysis-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Check if index exists
      const indexList = await pc.listIndexes();
      const indexExists = indexList.indexes?.some(index => index.name === indexName);

      if (!indexExists) {
        console.log(`📊 Creating Pinecone index for category: ${categoryName}`);
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
      this.categoryIndexes.set(categoryName, index);

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
                category: categoryName,
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
          console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${categoryName}`);
          
          if (i + batchSize < vectors.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      console.log(`✅ Created RAG for ${categoryName} with ${vectors.length} vectors`);
      return vectors.length;
    } catch (error) {
      console.error(`Error creating RAG for ${categoryName}:`, error);
      throw error;
    }
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

  // Query category-specific RAG
  async queryRAG(categoryName, question, responseType = 'default') {
    try {
      const index = this.categoryIndexes.get(categoryName);
      if (!index) {
        throw new Error(`No RAG index found for category: ${categoryName}`);
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
      console.error(`Error querying RAG for ${categoryName}:`, error);
      return `Error querying RAG: ${error.message}`;
    }
  }

  // Mock database query (you'll replace with actual Prisma queries)
  async queryDatabase(fields, prompt, responseType = 'default') {
    try {
      // TODO: Replace with actual Prisma query
      // const products = await prisma.legalSoftware.findMany({
      //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      // });

      // Enhanced mock data for better responses
      const mockData = {
        caseStudies: "SpotDraft: 90% cycle time reduction, ContractWorks: 85% compliance improvement, PandaDoc: 70% faster approvals, DocuSign: 95% digital adoption",
        valueMetrics: "SpotDraft: 1.5M hours saved, ContractWorks: 500K contracts processed, PandaDoc: 300K documents automated, DocuSign: 2M signatures collected",
        vendorComments: "SpotDraft: Leading AI-powered solution, ContractWorks: Simple and effective platform, PandaDoc: User-friendly interface, DocuSign: Industry standard for e-signatures",
        productName: "SpotDraft, ContractWorks, PandaDoc, DocuSign CLM, Ironclad, Concord, Outlaw, Juro",
        description: "AI-powered contract lifecycle management platforms with automation capabilities, document management systems, and digital signature solutions",
        technologyStack: "Cloud-based SaaS: 8 vendors, AI/ML integration: 6 vendors, API connectivity: 7 vendors, Enterprise security: 8 vendors",
        slug: "spotdraft, contractworks, pandadoc, docusign-clm, ironclad, concord, outlaw, juro",
        topUseCases: "Contract automation: 8 vendors, Legal team collaboration: 7 vendors, Compliance management: 6 vendors, Document workflow: 8 vendors",
        criticalOpinions: "UI complexity: 3 vendors, Template limitations: 2 vendors, Pricing transparency: 4 vendors, Integration challenges: 2 vendors",
        isPremium: "Premium features available: 6 vendors, Enterprise tier: 5 vendors, Advanced AI: 4 vendors",
        tag: "CLM: 5 vendors, AI-powered: 4 vendors, Enterprise: 6 vendors, Cloud-based: 8 vendors",
        coreFunctionalities: "Contract Creation: 8 vendors, Negotiation: 7 vendors, Analytics: 6 vendors, Repository: 8 vendors",
        keyFeatures: "AI Analysis: 4 vendors, E-signatures: 8 vendors, Workflow Automation: 7 vendors, Collaboration: 8 vendors",
        userSatisfaction: "High satisfaction: 5 vendors, Good ratings: 7 vendors, Strong support: 6 vendors",
        bestKnownFor: "Innovation: SpotDraft, Simplicity: ContractWorks, Usability: PandaDoc, Reliability: DocuSign"
      };

      const contextData = fields.map(field => `${field}: ${mockData[field] || 'Not available'}`).join('\n');

      let dbPrompt;
      
      if (responseType === 'point') {
        dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

DATABASE INFORMATION:
${contextData}

IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

Example format:
• Point one about the topic
• Point two with specific details  
• Point three with key insights
• Point four with important information

BULLET POINT RESPONSE:`;
      } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
        const graphFormat = this.getGraphFormat(responseType);
        dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

DATABASE INFORMATION:
${contextData}

IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
${graphFormat.instruction}

Required format: ${graphFormat.format}
Example: ${graphFormat.example}

Extract relevant data from the database information and format it accordingly.
Respond with ONLY the formatted data, no additional text or explanations.

${responseType.toUpperCase()} CHART DATA:`;
      } else {
        dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

DATABASE INFORMATION:
${contextData}

Provide a structured response using only the information provided above.

RESPONSE:`;
      }

      const response = await openai.invoke(dbPrompt);
      return response.content || response;
      
    } catch (error) {
      console.error('Error querying database:', error);
      return `Error querying database: ${error.message}`;
    }
  }

  // Format response based on type
  formatResponse(ragResponse, dbResponse, type) {
    switch (type) {
      case 'bar':
      case 'line':
      case 'pie':
      case 'scatter':
      case 'area':
        // For graph types, combine and clean the responses
        const combinedGraphData = `${ragResponse}\n${dbResponse}`;
        
        // Extract the best formatted data
        const lines = combinedGraphData.split('\n').filter(line => line.trim());
        let bestMatch = '';
        
        // Look for lines that match the expected format
        for (const line of lines) {
          if (type === 'pie' && line.includes('%')) {
            bestMatch = line.trim();
            break;
          } else if (type === 'scatter' && line.includes('(') && line.includes(')')) {
            bestMatch = line.trim();
            break;
          } else if ((type === 'bar' || type === 'line' || type === 'area') && line.includes(':')) {
            // Check if it has the right format "Name: Number"
            const pairs = line.split(',').map(pair => pair.trim());
            const validPairs = pairs.filter(pair => {
              const parts = pair.split(':');
              return parts.length === 2 && !isNaN(parseFloat(parts[1].trim()));
            });
            if (validPairs.length >= 3) {
              bestMatch = line.trim();
              break;
            }
          }
        }
        
        // Fallback to generating format based on mock data
        if (!bestMatch) {
          const mockFormats = {
            'bar': 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15, Ironclad: 10',
            'line': 'Q1: 45, Q2: 52, Q3: 48, Q4: 60, Q5: 55',
            'pie': 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%',
            'scatter': 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)',
            'area': 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
          };
          bestMatch = mockFormats[type];
        }
        
        return bestMatch;
        
      case 'point':
        // Extract bullet points from both responses
        const allPoints = [];
        
        // Parse RAG response for bullet points
        if (ragResponse && ragResponse !== "No relevant content found in the processed documents for this question.") {
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
        
        // Parse Database response for bullet points
        if (dbResponse && dbResponse.trim().length > 0) {
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
        
        // If still no points, provide defaults
        if (allPoints.length === 0) {
          allPoints.push(
            "Contract Lifecycle Management is the dominant category",
            "AI-powered features are increasingly popular", 
            "Cloud-based SaaS solutions are preferred",
            "Integration capabilities are essential features"
          );
        }
        
        // Clean up points and return array (max 6 points)
        const cleanPoints = allPoints
          .map(point => point.trim())
          .filter(point => point.length > 0)
          .slice(0, 6);
        
        return cleanPoints;
        
      default:
        return `${ragResponse}\n\n${dbResponse}`;
    }
  }

  // Process insights structure
  async processInsights(insights, miData) {
    const results = { ...insights };
    
    console.log('🚀 Starting Advanced AI Analysis Workflow...');
    
    // Iterate through main categories
    for (const [mainCategory, categoryConfig] of Object.entries(insights)) {
      console.log(`\n📋 Processing main category: ${mainCategory}`);
      
      const dataHeaderName = categoryConfig.data_header_name;
      console.log(`🔍 Looking for data header: ${dataHeaderName}`);
      
      // Find matching miData
      const matchingMiData = miData[dataHeaderName];
      if (!matchingMiData) {
        console.log(`⚠️  No matching miData found for: ${dataHeaderName}`);
        continue;
      }
      
      // Create category-specific RAG
      console.log(`📊 Creating RAG for category: ${mainCategory}`);
      const processedContent = await this.processContentForCategory(mainCategory, matchingMiData);
      
      if (processedContent.length > 0) {
        await this.createCategoryRAG(mainCategory, processedContent);
        
        // Process sub-categories
        for (const [subCategory, subConfig] of Object.entries(categoryConfig)) {
          if (subCategory === 'data_header_name') continue;
          
          console.log(`\n🔧 Processing sub-category: ${subCategory}`);
          
          // Process objects within sub-category (graph, content, insights, etc.)
          for (const [objectKey, objectConfig] of Object.entries(subConfig)) {
            if (objectKey === 'databaseCollection') continue;
            
            console.log(`  📝 Processing object: ${objectKey}`);
            
            const { prompt, fields, type, heading } = objectConfig;
            
            if (prompt && fields) {
              console.log(`    🤖 Querying: "${prompt}"`);
              
              // Query RAG with response type
              const ragResponse = await this.queryRAG(mainCategory, prompt, type);
              
              // Query Database with response type
              const dbResponse = await this.queryDatabase(fields, prompt, type);
              
              // Format combined response
              const finalResponse = this.formatResponse(ragResponse, dbResponse, type);
              
              // Update results structure
              results[mainCategory][subCategory][objectKey].response = finalResponse;
              
              console.log(`    ✅ Generated ${type} response:`, Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`);
            }
          }
        }
      } else {
        console.log(`⚠️  No content processed for category: ${mainCategory}`);
      }
    }
    
    return results;
  }

  // Main analysis workflow
  async runAnalysis(body) {
    try {
      const { insights, miData } = body;
      
      if (!insights || !miData) {
        throw new Error('Missing required fields: insights and miData');
      }

      console.log('=== ADVANCED MI ANALYSIS STARTED ===');
      
      // Process the complete insights structure
      const enhancedInsights = await this.processInsights(insights, miData);
      
      return {
        success: true,
        insights: enhancedInsights,
        summary: {
          totalCategories: Object.keys(insights).length,
          processedAt: new Date().toISOString(),
          message: 'Analysis completed with RAG and database integration'
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
    
    console.log('=== ADVANCED MI ANALYSE API CALLED ===');
    console.log('Request structure:', {
      hasInsights: !!body.insights,
      hasMiData: !!body.miData,
      mainCategories: body.insights ? Object.keys(body.insights) : [],
      miDataKeys: body.miData ? Object.keys(body.miData) : []
    });
    
    const workflow = new AdvancedAIAnalysisWorkflow();
    const analysisResults = await workflow.runAnalysis(body);
    
    console.log('\n=== ANALYSIS COMPLETED ===');
    console.log('📊 Enhanced Insights Structure:');
    console.log(JSON.stringify(analysisResults.insights, null, 2));
    console.log('=== END ADVANCED MI ANALYSE ===');

    return NextResponse.json(
      { 
        message: 'Advanced analysis completed successfully',
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