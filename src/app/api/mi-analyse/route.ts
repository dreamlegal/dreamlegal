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
// // import prisma from '@/lib/prisma';

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
// //     this.subCategoryIndexes = new Map(); // Store sub-category-specific indexes
// //   }

// //   // Graph format specifications
// //   getGraphFormat(type) {
// //     const formats = {
// //       'bar': {
// //         format: 'Tool1: 10, Tool2: 8, Tool3: 6, Tool4: 4',
// //         instruction: 'Provide data as "Name: Value" pairs separated by commas. Values should be numbers.',
// //         example: 'SpotDraft: 25, ContractWorks: 18, PandaDoc: 12, DocuSign: 15'
// //       },
// //       'line': {
// //         format: 'Jan: 10, Feb: 12, Mar: 8, Apr: 15, May: 20',
// //         instruction: 'Provide time-series data as "Period: Value" pairs separated by commas.',
// //         example: 'Q1 2023: 45, Q2 2023: 52, Q3 2023: 48, Q4 2023: 60'
// //       },
// //       'pie': {
// //         format: 'Category1: 35%, Category2: 25%, Category3: 20%, Category4: 20%',
// //         instruction: 'Provide data as "Category: Percentage%" pairs. Percentages should add up to 100%.',
// //         example: 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%'
// //       },
// //       'scatter': {
// //         format: 'Tool1: (8.5, 1000), Tool2: (7.2, 800), Tool3: (9.1, 1200)',
// //         instruction: 'Provide data as "Name: (X-value, Y-value)" pairs for two-dimensional plotting.',
// //         example: 'SpotDraft: (9.2, 2500), ContractWorks: (7.8, 1800), PandaDoc: (8.1, 2200)'
// //       },
// //       'area': {
// //         format: 'Period1: 100, Period2: 150, Period3: 120, Period4: 180',
// //         instruction: 'Provide cumulative or stacked data as "Period: Value" pairs.',
// //         example: 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
// //       }
// //     };
    
// //     return formats[type] || formats['bar'];
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

// //   // Get combined miData sources based on database field
// //   getCombinedMiDataSources(databaseConfig, miData) {
// //     const combinedSources = [];
    
// //     if (!databaseConfig || !miData) {
// //       return combinedSources;
// //     }

// //     // Loop through each top category in database config
// //     for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
// //       console.log(`🔍 Processing top category: ${topCategory}`);
      
// //       // Check if this top category exists in miData
// //       if (miData[topCategory]) {
// //         // Loop through each sub category to combine
// //         for (const subCategory of subCategories) {
// //           console.log(`  📋 Adding sub category: ${subCategory}`);
          
// //           if (miData[topCategory][subCategory]) {
// //             combinedSources.push({
// //               topCategory,
// //               subCategory,
// //               data: miData[topCategory][subCategory]
// //             });
// //           }
// //         }
// //       }
// //     }
    
// //     return combinedSources;
// //   }

// //   // Process content for a sub-category using combined sources - IMPROVED VERSION
// //   async processContentForSubCategory(subCategoryName, combinedSources) {
// //     const allContent = [];
// //     const tempDir = path.join(process.cwd(), 'temp');
// //     const processingStats = {
// //       totalSources: combinedSources.length,
// //       pdfCount: 0,
// //       articleCount: 0,
// //       processedPdfs: 0,
// //       processedArticles: 0,
// //       errors: []
// //     };

// //     if (!fs.existsSync(tempDir)) {
// //       fs.mkdirSync(tempDir, { recursive: true });
// //     }

// //     try {
// //       console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
// //       console.log(`📊 Combined sources count: ${combinedSources.length}`);

// //       // If no sources available, return empty but don't fail
// //       if (combinedSources.length === 0) {
// //         console.log(`⚠️  No sources available for ${subCategoryName}`);
// //         return {
// //           content: [],
// //           stats: processingStats,
// //           message: `No sources available for ${subCategoryName}`
// //         };
// //       }

// //       for (const source of combinedSources) {
// //         const { topCategory, subCategory, data } = source;
// //         console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

// //         // Count available sources
// //         const hasPdfs = data.pdflinks && data.pdflinks.length > 0;
// //         const hasArticles = data.articlelinks && data.articlelinks.length > 0;
        
// //         if (hasPdfs) processingStats.pdfCount += data.pdflinks.length;
// //         if (hasArticles) processingStats.articleCount += data.articlelinks.length;

// //         console.log(`    📄 PDFs available: ${hasPdfs ? data.pdflinks.length : 0}`);
// //         console.log(`    📰 Articles available: ${hasArticles ? data.articlelinks.length : 0}`);

// //         // Process PDFs if available
// //         if (hasPdfs) {
// //           console.log(`    🔄 Processing ${data.pdflinks.length} PDFs...`);
          
// //           for (const pdfUrl of data.pdflinks) {
// //             if (!this.isValidUrl(pdfUrl)) {
// //               console.log(`    ❌ Invalid PDF URL: ${pdfUrl}`);
// //               processingStats.errors.push(`Invalid PDF URL: ${pdfUrl}`);
// //               continue;
// //             }

// //             try {
// //               const pdfPath = await this.downloadPDF(pdfUrl, tempDir);
// //               const pdfContent = await this.extractPDFContent(pdfPath);
              
// //               if (pdfContent && pdfContent.trim().length > 100) {
// //                 allContent.push({
// //                   source: pdfUrl,
// //                   type: 'pdf',
// //                   category: `${topCategory}/${subCategory}`,
// //                   content: pdfContent,
// //                   metadata: {
// //                     source_type: 'pdf',
// //                     top_category: topCategory,
// //                     sub_category: subCategory,
// //                     sub_category_name: subCategoryName,
// //                     url: pdfUrl,
// //                     processed_at: new Date().toISOString(),
// //                     content_length: pdfContent.length
// //                   }
// //                 });
// //                 processingStats.processedPdfs++;
// //                 console.log(`    ✅ PDF processed: ${pdfUrl.substring(0, 50)}...`);
// //               } else {
// //                 console.log(`    ⚠️  PDF content too short or empty: ${pdfUrl}`);
// //                 processingStats.errors.push(`PDF content too short: ${pdfUrl}`);
// //               }

// //               // Clean up temp file
// //               if (fs.existsSync(pdfPath)) {
// //                 fs.unlinkSync(pdfPath);
// //               }
// //             } catch (error) {
// //               console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error.message);
// //               processingStats.errors.push(`PDF processing error: ${pdfUrl} - ${error.message}`);
// //             }
// //           }
// //         } else {
// //           console.log(`    ⚠️  No PDFs available for ${topCategory}/${subCategory}`);
// //         }

// //         // Process articles if available
// //         if (hasArticles) {
// //           console.log(`    🔄 Processing ${data.articlelinks.length} articles...`);
          
// //           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
// //           if (validUrls.length > 0) {
// //             console.log(`    📰 Valid article URLs: ${validUrls.length}/${data.articlelinks.length}`);
            
// //             try {
// //               const webContent = await this.extractWebContent(validUrls);
              
// //               webContent.forEach(item => {
// //                 if (item.content && item.content.trim().length > 100) {
// //                   allContent.push({
// //                     source: item.url,
// //                     type: 'article',
// //                     category: `${topCategory}/${subCategory}`,
// //                     content: item.content,
// //                     title: item.title,
// //                     highlights: item.highlights,
// //                     summary: item.summary,
// //                     metadata: {
// //                       source_type: 'article',
// //                       top_category: topCategory,
// //                       sub_category: subCategory,
// //                       sub_category_name: subCategoryName,
// //                       url: item.url,
// //                       title: item.title || '',
// //                       processed_at: new Date().toISOString(),
// //                       content_length: item.content.length
// //                     }
// //                   });
// //                   processingStats.processedArticles++;
// //                   console.log(`    ✅ Article processed: ${item.title || item.url.substring(0, 50)}...`);
// //                 } else {
// //                   console.log(`    ⚠️  Article content too short: ${item.url}`);
// //                   processingStats.errors.push(`Article content too short: ${item.url}`);
// //                 }
// //               });
// //             } catch (error) {
// //               console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error.message);
// //               processingStats.errors.push(`Article processing error: ${topCategory}/${subCategory} - ${error.message}`);
// //             }
// //           } else {
// //             console.log(`    ⚠️  No valid article URLs found`);
// //             processingStats.errors.push(`No valid article URLs in ${topCategory}/${subCategory}`);
// //           }
// //         } else {
// //           console.log(`    ⚠️  No articles available for ${topCategory}/${subCategory}`);
// //         }
// //       }

// //       // Summary of processing
// //       console.log(`\n📊 Processing Summary for ${subCategoryName}:`);
// //       console.log(`   Total sources: ${processingStats.totalSources}`);
// //       console.log(`   PDFs: ${processingStats.processedPdfs}/${processingStats.pdfCount} processed`);
// //       console.log(`   Articles: ${processingStats.processedArticles}/${processingStats.articleCount} processed`);
// //       console.log(`   Total content items: ${allContent.length}`);
// //       console.log(`   Errors: ${processingStats.errors.length}`);
      
// //       if (processingStats.errors.length > 0) {
// //         console.log(`   Error details:`, processingStats.errors.slice(0, 3)); // Show first 3 errors
// //       }

// //     } finally {
// //       // Clean up temp directory
// //       if (fs.existsSync(tempDir)) {
// //         fs.rmSync(tempDir, { recursive: true, force: true });
// //       }
// //     }

// //     return {
// //       content: allContent,
// //       stats: processingStats,
// //       message: allContent.length > 0 ? 
// //         `Successfully processed ${allContent.length} content items` : 
// //         'No content could be processed from available sources'
// //     };
// //   }

// //   // Create sub-category-specific Pinecone index and store content - IMPROVED VERSION
// //   async createSubCategoryRAG(subCategoryName, processedResult) {
// //     try {
// //       const { content: processedContent, stats, message } = processedResult;
      
// //       // If no content was processed, create a minimal RAG index
// //       if (processedContent.length === 0) {
// //         console.log(`⚠️  No content to create RAG for ${subCategoryName}: ${message}`);
// //         return {
// //           vectorCount: 0,
// //           status: 'no_content',
// //           message: message,
// //           stats: stats
// //         };
// //       }

// //       const indexName = `mi-subcategory-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
// //       // Check if index exists
// //       const indexList = await pc.listIndexes();
// //       const indexExists = indexList.indexes?.some(index => index.name === indexName);

// //       if (!indexExists) {
// //         console.log(`📊 Creating Pinecone index for sub-category: ${subCategoryName}`);
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
// //       this.subCategoryIndexes.set(subCategoryName, index);

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
// //           console.log(`📊 Upserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)} for ${subCategoryName}`);
          
// //           if (i + batchSize < vectors.length) {
// //             await new Promise(resolve => setTimeout(resolve, 1000));
// //           }
// //         }
// //       }

// //       console.log(`✅ Created RAG for ${subCategoryName} with ${vectors.length} vectors`);
// //       return {
// //         vectorCount: vectors.length,
// //         status: 'success',
// //         message: `Successfully created RAG with ${vectors.length} vectors`,
// //         stats: stats
// //       };
// //     } catch (error) {
// //       console.error(`Error creating RAG for ${subCategoryName}:`, error);
// //       return {
// //         vectorCount: 0,
// //         status: 'error',
// //         message: `Error creating RAG: ${error.message}`,
// //         stats: stats || {}
// //       };
// //     }
// //   }

// //   // Query sub-category-specific RAG - IMPROVED VERSION
// //   async querySubCategoryRAG(subCategoryName, question, responseType = 'default') {
// //     try {
// //       const index = this.subCategoryIndexes.get(subCategoryName);
// //       if (!index) {
// //         console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
// //         return {
// //           response: "No processed content available for this sub-category.",
// //           status: 'no_index',
// //           hasContent: false
// //         };
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
// //         console.log(`⚠️  No relevant matches found for: ${question}`);
// //         return {
// //           response: "No relevant content found in the processed documents for this question.",
// //           status: 'no_matches',
// //           hasContent: false
// //         };
// //       }

// //       const context = relevantMatches
// //         .map(match => match.metadata.chunk_text)
// //         .join('\n\n');

// //       let prompt;
      
// //       if (responseType === 'point') {
// //         prompt = `Based on the following context from legal software documents, answer: "${question}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // CONTEXT:
// // ${context}

// // IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// // Example format:
// // • Point one about the topic
// // • Point two with specific details
// // • Point three with key insights
// // • Point four with important information

// // BULLET POINT RESPONSE:`;
// //       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
// //         const graphFormat = this.getGraphFormat(responseType);
// //         prompt = `Based on the following context from legal software documents, answer: "${question}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // CONTEXT:
// // ${context}

// // IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// // ${graphFormat.instruction}

// // Required format: ${graphFormat.format}
// // Example: ${graphFormat.example}

// // Respond with ONLY the formatted data, no additional text or explanations.

// // ${responseType.toUpperCase()} CHART DATA:`;
// //       } else {
// //         prompt = `Based on the following context from legal software documents, provide a comprehensive analysis for: "${question}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // CONTEXT:
// // ${context}

// // Provide a detailed response with specific examples and data from the context. Be comprehensive and informative.

// // RESPONSE:`;
// //       }

// //       const response = await openai.invoke(prompt);
// //       return {
// //         response: response.content || response,
// //         status: 'success',
// //         hasContent: true,
// //         matchCount: relevantMatches.length
// //       };
      
// //     } catch (error) {
// //       console.error(`Error querying RAG for ${subCategoryName}:`, error);
// //       return {
// //         response: `Error querying processed content: ${error.message}`,
// //         status: 'error',
// //         hasContent: false
// //       };
// //     }
// //   }

// //   // Enhanced database query with better mock data
// //   async queryDatabase(fields, prompt, responseType = 'default') {
// //     try {
// //       // TODO: Replace with actual Prisma query based on fields
// //       // const products = await prisma.legalSoftware.findMany({
// //       //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
// //       // });

// //       // Enhanced mock data for better responses
// //       const mockData = {
// //         coreFunctionalities: "Contract Creation: 8 vendors, Negotiation: 7 vendors, Analytics: 6 vendors, Repository: 8 vendors, AI Analysis: 5 vendors",
// //         keyFeatures: "AI Analysis: 4 vendors, E-signatures: 8 vendors, Workflow Automation: 7 vendors, Collaboration: 8 vendors, Document Management: 6 vendors",
// //         topUseCases: "Contract automation: 8 vendors, Legal team collaboration: 7 vendors, Compliance management: 6 vendors, Document workflow: 8 vendors, Risk assessment: 4 vendors",
// //         userSatisfaction: "High satisfaction: 5 vendors, Good ratings: 7 vendors, Strong support: 6 vendors, Average rating 4.2/5: 8 vendors",
// //         bestKnownFor: "Innovation: SpotDraft, Simplicity: ContractWorks, Usability: PandaDoc, Reliability: DocuSign, AI Power: Harvey, Speed: Ironclad",
// //         criticalOpinions: "UI complexity: 3 vendors, Template limitations: 2 vendors, Pricing transparency: 4 vendors, Integration challenges: 2 vendors, Learning curve: 3 vendors",
// //         caseStudies: "SpotDraft: 90% cycle time reduction, ContractWorks: 85% compliance improvement, PandaDoc: 70% faster approvals, DocuSign: 95% digital adoption, Harvey: 60% research time saved"
// //       };

// //       const contextData = fields.map(field => `${field}: ${mockData[field] || 'Not available'}`).join('\n');

// //       let dbPrompt;
      
// //       if (responseType === 'point') {
// //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // DATABASE INFORMATION:
// // ${contextData}

// // IMPORTANT: Provide your response as 4-6 clear, concise bullet points. Each point should be a single sentence. Format each point as a separate line starting with "•".

// // Example format:
// // • Point one about the topic
// // • Point two with specific details  
// // • Point three with key insights
// // • Point four with important information

// // BULLET POINT RESPONSE:`;
// //       } else if (['bar', 'line', 'pie', 'scatter', 'area'].includes(responseType)) {
// //         const graphFormat = this.getGraphFormat(responseType);
// //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // DATABASE INFORMATION:
// // ${contextData}

// // IMPORTANT: Provide your response in ${responseType.toUpperCase()} CHART format ONLY.
// // ${graphFormat.instruction}

// // Required format: ${graphFormat.format}
// // Example: ${graphFormat.example}

// // Extract relevant data from the database information and format it accordingly.
// // Respond with ONLY the formatted data, no additional text or explanations.

// // ${responseType.toUpperCase()} CHART DATA:`;
// //       } else {
// //         dbPrompt = `Based on the following database information about legal software products, answer: "${prompt}"

// // ${FUNCTIONALITY_CONSTRAINTS}

// // DATABASE INFORMATION:
// // ${contextData}

// // Provide a structured response using only the information provided above.

// // RESPONSE:`;
// //       }

// //       const response = await openai.invoke(dbPrompt);
// //       return response.content || response;
      
// //     } catch (error) {
// //       console.error('Error querying database:', error);
// //       return `Error querying database: ${error.message}`;
// //     }
// //   }

// //   // Format response based on type - IMPROVED VERSION
// //   formatResponse(ragResult, dbResponse, type) {
// //     const { response: ragResponse, status: ragStatus, hasContent } = ragResult;
    
// //     // If no content was processed, rely more on database response
// //     if (!hasContent) {
// //       console.log(`⚠️  No RAG content available, using database response only`);
      
// //       if (type === 'point') {
// //         // Extract points from database response
// //         const dbPoints = dbResponse.split('\n')
// //           .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
// //           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// //           .filter(point => point.length > 0);
        
// //         if (dbPoints.length === 0) {
// //           // Generate default points if no bullet points found
// //           return [
// //             "Analysis based on database information only",
// //             "No specific content was processed for this category",
// //             "Database provides general market insights",
// //             "Consider adding more specific sources for detailed analysis"
// //           ];
// //         }
        
// //         return dbPoints.slice(0, 6);
// //       }
      
// //       return dbResponse;
// //     }
    
// //     // Original format response logic when content is available
// //     switch (type) {
// //       case 'bar':
// //       case 'line':
// //       case 'pie':
// //       case 'scatter':
// //       case 'area':
// //         // Graph formatting logic
// //         const combinedGraphData = `${ragResponse}\n${dbResponse}`;
        
// //         const lines = combinedGraphData.split('\n').filter(line => line.trim());
// //         let bestMatch = '';
        
// //         for (const line of lines) {
// //           if (type === 'pie' && line.includes('%')) {
// //             bestMatch = line.trim();
// //             break;
// //           } else if (type === 'scatter' && line.includes('(') && line.includes(')')) {
// //             bestMatch = line.trim();
// //             break;
// //           } else if ((type === 'bar' || type === 'line' || type === 'area') && line.includes(':')) {
// //             const pairs = line.split(',').map(pair => pair.trim());
// //             const validPairs = pairs.filter(pair => {
// //               const parts = pair.split(':');
// //               return parts.length === 2 && !isNaN(parseFloat(parts[1].trim()));
// //             });
// //             if (validPairs.length >= 3) {
// //               bestMatch = line.trim();
// //               break;
// //             }
// //           }
// //         }
        
// //         if (!bestMatch) {
// //           const mockFormats = {
// //             'bar': 'SpotDraft: 25, Harvey: 18, ContractWorks: 12, PandaDoc: 15, Ironclad: 10',
// //             'line': 'Q1: 45, Q2: 52, Q3: 48, Q4: 60, Q5: 55',
// //             'pie': 'CLM: 40%, Legal AI: 25%, Document Mgmt: 20%, E-discovery: 15%',
// //             'scatter': 'SpotDraft: (9.2, 2500), Harvey: (8.8, 2200), ContractWorks: (7.8, 1800)',
// //             'area': 'Jan: 120, Feb: 185, Mar: 240, Apr: 310, May: 380'
// //           };
// //           bestMatch = mockFormats[type];
// //         }
        
// //         return bestMatch;
        
// //       case 'point':
// //         // Point formatting logic
// //         const allPoints = [];
        
// //         if (ragResponse && ragResponse !== "No relevant content found in the processed documents for this question.") {
// //           const ragBullets = ragResponse.split('\n')
// //             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
// //             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// //             .filter(point => point.length > 10);
          
// //           allPoints.push(...ragBullets);
          
// //           if (ragBullets.length === 0) {
// //             const sentences = ragResponse.split(/[.!?]+/)
// //               .map(s => s.trim())
// //               .filter(s => s.length > 15 && s.length < 150)
// //               .slice(0, 3);
// //             allPoints.push(...sentences);
// //           }
// //         }
        
// //         if (dbResponse && dbResponse.trim().length > 0) {
// //           const dbBullets = dbResponse.split('\n')
// //             .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
// //             .map(line => line.replace(/^[•\-*]\s*/, '').trim())
// //             .filter(point => point.length > 10);
          
// //           allPoints.push(...dbBullets);
          
// //           if (dbBullets.length === 0) {
// //             const sentences = dbResponse.split(/[.!?]+/)
// //               .map(s => s.trim())
// //               .filter(s => s.length > 15 && s.length < 150)
// //               .slice(0, 3);
// //             allPoints.push(...sentences);
// //           }
// //         }
        
// //         if (allPoints.length === 0) {
// //           allPoints.push(
// //             "Contract Lifecycle Management is the dominant category",
// //             "AI-powered features are increasingly popular", 
// //             "Cloud-based SaaS solutions are preferred",
// //             "Integration capabilities are essential features"
// //           );
// //         }
        
// //         const cleanPoints = allPoints
// //           .map(point => point.trim())
// //           .filter(point => point.length > 0)
// //           .slice(0, 6);
        
// //         return cleanPoints;
        
// //       default:
// //         return `${ragResponse}\n\n${dbResponse}`;
// //     }
// //   }

// //   // Process insights structure with new flow - IMPROVED VERSION
// //   async processInsights(insights, miData) {
// //     const results = { ...insights };
    
// //     console.log('🚀 Starting Advanced AI Analysis Workflow (Enhanced Structure)...');
    
// //     // Iterate through main categories (e.g., "competitive-intel")
// //     for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
// //       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
// //       // Iterate through sub-categories (e.g., "key feature types")
// //       for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
// //         console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
// //         // Check if this sub-category has a database field
// //         if (subCategoryConfig.database) {
// //           console.log(`📊 Found database config for ${subCategory}`);
          
// //           // Get combined miData sources based on database config
// //           const combinedSources = this.getCombinedMiDataSources(subCategoryConfig.database, miData);
          
// //           if (combinedSources.length > 0) {
// //             console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
            
// //             // Process content - now returns an object with content, stats, and message
// //             const processedResult = await this.processContentForSubCategory(subCategory, combinedSources);
            
// //             console.log(`📊 Processing result: ${processedResult.message}`);
// //             console.log(`📊 Content items: ${processedResult.content.length}`);
            
// //             // Create RAG - now handles the new structure
// //             const ragResult = await this.createSubCategoryRAG(subCategory, processedResult);
            
// //             console.log(`📊 RAG result: ${ragResult.message}`);
            
// //             // Process objects within sub-category (graph, content, insights, etc.)
// //             for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
// //               if (objectKey === 'database') continue; // Skip database config
              
// //               console.log(`  📝 Processing object: ${objectKey}`);
              
// //               const { prompt, fields, type, heading } = objectConfig;
              
// //               if (prompt && fields) {
// //                 console.log(`    🤖 Querying: "${prompt}"`);
                
// //                 // Query sub-category RAG - now returns an object with response, status, hasContent
// //                 const ragQueryResult = await this.querySubCategoryRAG(subCategory, prompt, type);
                
// //                 // Query Database
// //                 const dbResponse = await this.queryDatabase(fields, prompt, type);
                
// //                 // Format combined response - now handles the new structure
// //                 const finalResponse = this.formatResponse(ragQueryResult, dbResponse, type);
                
// //                 // Update results structure
// //                 results[mainCategory][subCategory][objectKey].response = finalResponse;
                
// //                 console.log(`    ✅ Generated ${type} response: ${ragQueryResult.status} - ${Array.isArray(finalResponse) ? `[${finalResponse.length} points]` : `(${finalResponse.length} chars)`}`);
// //               }
// //             }
// //           } else {
// //             console.log(`⚠️  No matching miData sources found for ${subCategory}`);
            
// //             // Still process with database-only responses
// //             for (const [objectKey, objectConfig] of Object.entries(subCategoryConfig)) {
// //               if (objectKey === 'database') continue; // Skip database config
              
// //               const { prompt, fields, type } = objectConfig;
              
// //               if (prompt && fields) {
// //                 console.log(`    🤖 Database-only query: "${prompt}"`);
                
// //                 const dbResponse = await this.queryDatabase(fields, prompt, type);
                
// //                 // Create a mock RAG result for no content case
// //                 const mockRagResult = {
// //                   response: "No specific content processed for this category.",
// //                   status: 'no_content',
// //                   hasContent: false
// //                 };
                
// //                 const finalResponse = this.formatResponse(mockRagResult, dbResponse, type);
                
// //                 results[mainCategory][subCategory][objectKey].response = finalResponse;
                
// //                 console.log(`    ✅ Generated ${type} response (database only)`);
// //               }
// //             }
// //           }
// //         } else {
// //           console.log(`⚠️  No database config found for sub-category: ${subCategory}`);
// //         }
// //       }
// //     }
    
// //     return results;
// //   }

// //   // Save enhanced insights to database
// //   async saveEnhancedInsights(enhancedInsights, originalBody) {
// //     try {
// //       console.log('💾 Saving enhanced insights to MarketIntelligence table...');
      
// //       let marketIntelRecord;
      
// //       // Try to find existing record by ID if provided
// //       if (originalBody.recordId) {
// //         console.log(`🔍 Looking for record with ID: ${originalBody.recordId}`);
// //         marketIntelRecord = await prisma.marketIntelligence.findUnique({
// //           where: { id: originalBody.recordId }
// //         });
// //       }
      
// //       // If no specific ID or record not found, get the latest record
// //       if (!marketIntelRecord) {
// //         console.log('🔍 No specific record found, getting latest record...');
// //         marketIntelRecord = await prisma.marketIntelligence.findFirst({
// //           orderBy: { createdAt: 'desc' }
// //         });
// //       }
      
// //       // If record exists, update it
// //       if (marketIntelRecord) {
// //         console.log(`📝 Updating existing record: ${marketIntelRecord.id}`);
        
// //         const updatedRecord = await prisma.marketIntelligence.update({
// //           where: { id: marketIntelRecord.id },
// //           data: {
// //             insights: enhancedInsights,
// //             updatedAt: new Date()
// //           }
// //         });
        
// //         console.log('✅ Successfully updated insights in database');
        
// //         return {
// //           saved: true,
// //           recordId: updatedRecord.id,
// //           action: 'updated',
// //           savedAt: updatedRecord.updatedAt.toISOString()
// //         };
        
// //       } else {
// //         // If no record exists, create a new one
// //         console.log('📝 No existing record found, creating new record...');
        
// //         const newRecord = await prisma.marketIntelligence.create({
// //           data: {
// //             insights: enhancedInsights,
// //             miData: originalBody.miData || null,
// //             dashboardData: originalBody.dashboardData || null
// //           }
// //         });
        
// //         console.log('✅ Successfully created new record with insights');
        
// //         return {
// //           saved: true,
// //           recordId: newRecord.id,
// //           action: 'created',
// //           savedAt: newRecord.createdAt.toISOString()
// //         };
// //       }
      
// //     } catch (error) {
// //       console.error('❌ Error saving enhanced insights to database:', error);
      
// //       // Return error details but don't throw to avoid breaking the API response
// //       return {
// //         saved: false,
// //         error: error.message,
// //         action: 'failed',
// //         savedAt: new Date().toISOString()
// //       };
// //     }
// //   }

// //   // Main analysis workflow
// //   async runAnalysis(body) {
// //     try {
// //       const { insights, miData, dashboardData } = body;
      
// //       if (!insights || !miData) {
// //         throw new Error('Missing required fields: insights and miData');
// //       }

// //       console.log('=== ADVANCED MI ANALYSIS STARTED (ENHANCED STRUCTURE) ===');
      
// //       // Process the complete insights structure
// //       const enhancedInsights = await this.processInsights(insights, miData);
      
// //       // Save enhanced insights to database
// //       const saveResult = await this.saveEnhancedInsights(enhancedInsights, body);
      
// //       return {
// //         success: true,
// //         insights: enhancedInsights,
// //         saveResult: saveResult,
// //         summary: {
// //           totalMainCategories: Object.keys(insights).length,
// //           totalSubCategories: Object.values(insights).reduce((acc, cat) => acc + Object.keys(cat).length, 0),
// //           processedAt: new Date().toISOString(),
// //           message: 'Analysis completed with enhanced structure, flexible RAG and database integration',
// //           savedToDatabase: saveResult.saved
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
    
// //     console.log('=== ADVANCED MI ANALYSE API CALLED (ENHANCED STRUCTURE) ===');
// //     console.log('Request structure:', {
// //       hasInsights: !!body.insights,
// //       hasMiData: !!body.miData,
// //       hasDashboardData: !!body.dashboardData,
// //       recordId: body.recordId || 'Not provided - will use latest record',
// //       mainCategories: body.insights ? Object.keys(body.insights) : [],
// //       miDataTopCategories: body.miData ? Object.keys(body.miData) : []
// //     });
    
// //     const workflow = new AdvancedAIAnalysisWorkflow();
// //     const analysisResults = await workflow.runAnalysis(body);
    
// //     console.log('\n=== ANALYSIS COMPLETED ===');
// //     console.log('📊 Enhanced Insights Structure:');
// //     console.log(JSON.stringify(analysisResults.insights, null, 2));
    
// //     console.log('\n💾 DATABASE SAVE RESULT:');
// //     console.log(`Action: ${analysisResults.saveResult.action}`);
// //     console.log(`Record ID: ${analysisResults.saveResult.recordId}`);
// //     console.log(`Saved: ${analysisResults.saveResult.saved}`);
// //     console.log(`Saved At: ${analysisResults.saveResult.savedAt}`);
    
// //     if (!analysisResults.saveResult.saved) {
// //       console.log(`❌ Save Error: ${analysisResults.saveResult.error}`);
// //     }
    
// //     console.log('=== END ADVANCED MI ANALYSE ===');

// //     return NextResponse.json(
// //       { 
// //         message: 'Advanced analysis completed successfully with enhanced structure',
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
// import prisma from '@/lib/prisma';

// // Initialize services
// const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY
// });

// const exa = new Exa(process.env.EXA_API_KEY);

// // Updated to use GPT-4 with extended output size
// const openai = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   temperature: 0.2,
//   modelName: 'gpt-4',
//   maxTokens: 4000, // Extended output size
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

//   // Get combined miData sources based on database field
//   getCombinedMiDataSources(databaseConfig, miData) {
//     const combinedSources = [];
    
//     if (!databaseConfig || !miData || Object.keys(databaseConfig).length === 0) {
//       console.log('⚠️  No database config or miData available');
//       return combinedSources;
//     }

//     // Loop through each top category in database config
//     for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
//       console.log(`🔍 Processing top category: ${topCategory}`);
      
//       // Check if this top category exists in miData
//       if (miData[topCategory]) {
//         // Loop through each sub category to combine
//         for (const subCategory of subCategories) {
//           console.log(`  📋 Adding sub category: ${subCategory}`);
          
//           if (miData[topCategory][subCategory]) {
//             combinedSources.push({
//               topCategory,
//               subCategory,
//               data: miData[topCategory][subCategory]
//             });
//           }
//         }
//       }
//     }
    
//     return combinedSources;
//   }

//   // Process content for a sub-category using combined sources
//   async processContentForSubCategory(subCategoryName, combinedSources) {
//     const allContent = [];
//     const tempDir = path.join(process.cwd(), 'temp');
//     const processingStats = {
//       totalSources: combinedSources.length,
//       pdfCount: 0,
//       articleCount: 0,
//       processedPdfs: 0,
//       processedArticles: 0,
//       errors: []
//     };

//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }

//     try {
//       console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
//       console.log(`📊 Combined sources count: ${combinedSources.length}`);

//       // If no sources available, return empty but don't fail
//       if (combinedSources.length === 0) {
//         console.log(`⚠️  No sources available for ${subCategoryName}`);
//         return {
//           content: [],
//           stats: processingStats,
//           message: `No sources available for ${subCategoryName}`
//         };
//       }

//       for (const source of combinedSources) {
//         const { topCategory, subCategory, data } = source;
//         console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

//         // Count available sources
//         const hasPdfs = data.pdflinks && data.pdflinks.length > 0;
//         const hasArticles = data.articlelinks && data.articlelinks.length > 0;
        
//         if (hasPdfs) processingStats.pdfCount += data.pdflinks.length;
//         if (hasArticles) processingStats.articleCount += data.articlelinks.length;

//         console.log(`    📄 PDFs available: ${hasPdfs ? data.pdflinks.length : 0}`);
//         console.log(`    📰 Articles available: ${hasArticles ? data.articlelinks.length : 0}`);

//         // Process PDFs if available
//         if (hasPdfs) {
//           console.log(`    🔄 Processing ${data.pdflinks.length} PDFs...`);
          
//           for (const pdfUrl of data.pdflinks) {
//             if (!this.isValidUrl(pdfUrl)) {
//               console.log(`    ❌ Invalid PDF URL: ${pdfUrl}`);
//               processingStats.errors.push(`Invalid PDF URL: ${pdfUrl}`);
//               continue;
//             }

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
//                 processingStats.processedPdfs++;
//                 console.log(`    ✅ PDF processed: ${pdfUrl.substring(0, 50)}...`);
//               } else {
//                 console.log(`    ⚠️  PDF content too short or empty: ${pdfUrl}`);
//                 processingStats.errors.push(`PDF content too short: ${pdfUrl}`);
//               }

//               // Clean up temp file
//               if (fs.existsSync(pdfPath)) {
//                 fs.unlinkSync(pdfPath);
//               }
//             } catch (error) {
//               console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error.message);
//               processingStats.errors.push(`PDF processing error: ${pdfUrl} - ${error.message}`);
//             }
//           }
//         } else {
//           console.log(`    ⚠️  No PDFs available for ${topCategory}/${subCategory}`);
//         }

//         // Process articles if available
//         if (hasArticles) {
//           console.log(`    🔄 Processing ${data.articlelinks.length} articles...`);
          
//           const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
//           if (validUrls.length > 0) {
//             console.log(`    📰 Valid article URLs: ${validUrls.length}/${data.articlelinks.length}`);
            
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
//                   processingStats.processedArticles++;
//                   console.log(`    ✅ Article processed: ${item.title || item.url.substring(0, 50)}...`);
//                 } else {
//                   console.log(`    ⚠️  Article content too short: ${item.url}`);
//                   processingStats.errors.push(`Article content too short: ${item.url}`);
//                 }
//               });
//             } catch (error) {
//               console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error.message);
//               processingStats.errors.push(`Article processing error: ${topCategory}/${subCategory} - ${error.message}`);
//             }
//           } else {
//             console.log(`    ⚠️  No valid article URLs found`);
//             processingStats.errors.push(`No valid article URLs in ${topCategory}/${subCategory}`);
//           }
//         } else {
//           console.log(`    ⚠️  No articles available for ${topCategory}/${subCategory}`);
//         }
//       }

//       // Summary of processing
//       console.log(`\n📊 Processing Summary for ${subCategoryName}:`);
//       console.log(`   Total sources: ${processingStats.totalSources}`);
//       console.log(`   PDFs: ${processingStats.processedPdfs}/${processingStats.pdfCount} processed`);
//       console.log(`   Articles: ${processingStats.processedArticles}/${processingStats.articleCount} processed`);
//       console.log(`   Total content items: ${allContent.length}`);
//       console.log(`   Errors: ${processingStats.errors.length}`);
      
//       if (processingStats.errors.length > 0) {
//         console.log(`   Error details:`, processingStats.errors.slice(0, 3));
//       }

//     } finally {
//       // Clean up temp directory
//       if (fs.existsSync(tempDir)) {
//         fs.rmSync(tempDir, { recursive: true, force: true });
//       }
//     }

//     return {
//       content: allContent,
//       stats: processingStats,
//       message: allContent.length > 0 ? 
//         `Successfully processed ${allContent.length} content items` : 
//         'No content could be processed from available sources'
//     };
//   }

//   // Create sub-category-specific Pinecone index and store content
//   async createSubCategoryRAG(subCategoryName, processedResult) {
//     try {
//       const { content: processedContent, stats, message } = processedResult;
      
//       // If no content was processed, return no RAG
//       if (processedContent.length === 0) {
//         console.log(`⚠️  No content to create RAG for ${subCategoryName}: ${message}`);
//         return {
//           vectorCount: 0,
//           status: 'no_content',
//           message: message,
//           stats: stats
//         };
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
//       return {
//         vectorCount: vectors.length,
//         status: 'success',
//         message: `Successfully created RAG with ${vectors.length} vectors`,
//         stats: stats
//       };
//     } catch (error) {
//       console.error(`Error creating RAG for ${subCategoryName}:`, error);
//       return {
//         vectorCount: 0,
//         status: 'error',
//         message: `Error creating RAG: ${error.message}`,
//         stats: stats || {}
//       };
//     }
//   }

//   // Enhanced database query with better mock data
//   async queryDatabase(fields, subCategoryName) {
//     try {
//       // TODO: Replace with actual Prisma query based on fields
//       // const products = await prisma.legalSoftware.findMany({
//       //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
//       // });

//       // Enhanced mock data for better responses
//       const mockData = {
//         keyFeatures: "AI Analysis: 4 vendors, E-signatures: 8 vendors, Workflow Automation: 7 vendors, Collaboration: 8 vendors, Document Management: 6 vendors, Template Library: 9 vendors, Contract Analytics: 5 vendors, Approval Workflows: 7 vendors, Integration APIs: 6 vendors, Custom Fields: 8 vendors",
//         category: "Contract Lifecycle Management: 12 vendors, Legal AI: 8 vendors, Document Management: 10 vendors, E-discovery: 6 vendors, IP Management: 4 vendors, Legal Research: 7 vendors, Litigation Management: 5 vendors",
//         coreFunctionalities: "Contract Creation: 8 vendors, Negotiation: 7 vendors, Analytics: 6 vendors, Repository: 8 vendors, AI Analysis: 5 vendors, Approval Management: 9 vendors, Compliance Tracking: 6 vendors",
//         topUseCases: "Contract automation: 8 vendors, Legal team collaboration: 7 vendors, Compliance management: 6 vendors, Document workflow: 8 vendors, Risk assessment: 4 vendors, Due diligence: 5 vendors",
//         userSatisfaction: "High satisfaction: 5 vendors, Good ratings: 7 vendors, Strong support: 6 vendors, Average rating 4.2/5: 8 vendors, User-friendly: 9 vendors",
//         bestKnownFor: "Innovation: SpotDraft, Simplicity: ContractWorks, Usability: PandaDoc, Reliability: DocuSign, AI Power: Harvey, Speed: Ironclad, Security: Agiloft, Integration: Salesforce CLM",
//         criticalOpinions: "UI complexity: 3 vendors, Template limitations: 2 vendors, Pricing transparency: 4 vendors, Integration challenges: 2 vendors, Learning curve: 3 vendors, Limited customization: 4 vendors",
//         caseStudies: "SpotDraft: 90% cycle time reduction, ContractWorks: 85% compliance improvement, PandaDoc: 70% faster approvals, DocuSign: 95% digital adoption, Harvey: 60% research time saved, Ironclad: 80% error reduction"
//       };

//       console.log(`🔍 Querying database for fields: ${fields.join(', ')} for ${subCategoryName}`);
      
//       const contextData = fields.map(field => `${field}: ${mockData[field] || 'Data not available in current database'}`).join('\n');
      
//       return contextData;
      
//     } catch (error) {
//       console.error('Error querying database:', error);
//       return `Error querying database: ${error.message}`;
//     }
//   }

//   // Query sub-category RAG for context
//   async querySubCategoryRAG(subCategoryName, prompt) {
//     try {
//       const index = this.subCategoryIndexes.get(subCategoryName);
//       if (!index) {
//         console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
//         return {
//           response: "No processed content available for this sub-category.",
//           status: 'no_index',
//           hasContent: false
//         };
//       }

//       const questionEmbedding = await embeddings.embedQuery(prompt);
      
//       const searchResults = await index.query({
//         vector: questionEmbedding,
//         topK: 10, // Increased for better context
//         includeMetadata: true,
//         includeValues: false
//       });

//       const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
//       if (relevantMatches.length === 0) {
//         console.log(`⚠️  No relevant matches found for: ${prompt}`);
//         return {
//           response: "No relevant content found in the processed documents.",
//           status: 'no_matches',
//           hasContent: false
//         };
//       }

//       const context = relevantMatches
//         .map(match => match.metadata.chunk_text)
//         .join('\n\n');

//       return {
//         response: context,
//         status: 'success',
//         hasContent: true,
//         matchCount: relevantMatches.length
//       };
      
//     } catch (error) {
//       console.error(`Error querying RAG for ${subCategoryName}:`, error);
//       return {
//         response: `Error querying processed content: ${error.message}`,
//         status: 'error',
//         hasContent: false
//       };
//     }
//   }

//   // Generate comprehensive response and format for all three objects
//   async generateComprehensiveResponse(subCategoryName, prompt, fields, graphType, ragContext, dbContext) {
//     try {
//       console.log(`🤖 Generating comprehensive response for: ${subCategoryName}`);
      
//       // Build context from both RAG and database
//       let contextSection = '';
      
//       if (ragContext.hasContent) {
//         contextSection += `PROCESSED CONTENT CONTEXT:\n${ragContext.response}\n\n`;
//       }
      
//       if (dbContext && dbContext.trim().length > 0) {
//         contextSection += `DATABASE CONTEXT:\n${dbContext}\n\n`;
//       }
      
//       if (!contextSection) {
//         contextSection = `LIMITED CONTEXT: Using general knowledge about legal software for ${subCategoryName}.\n\n`;
//       }

//       // Create comprehensive prompt for all three responses
//       const graphFormat = this.getGraphFormat(graphType);
      
//       const comprehensivePrompt = `You are an expert legal technology analyst. Based on the following context, provide a comprehensive response to: "${prompt}"

// ${FUNCTIONALITY_CONSTRAINTS}

// ${contextSection}

// IMPORTANT: You must provide your response in the following THREE sections:

// 1. GRAPH_DATA: Provide data in ${graphType.toUpperCase()} format
// ${graphFormat.instruction}
// Required format: ${graphFormat.format}
// Example: ${graphFormat.example}

// 2. DETAILED_CONTENT: Provide a comprehensive, detailed analysis (minimum 300 words) that includes:
// - Specific examples and data points
// - Market trends and insights
// - Vendor comparisons where relevant
// - Industry implications
// - Technical details and implementation considerations

// 3. KEY_INSIGHTS: Provide exactly 5 bullet points with strategic insights for vendors, each point should be:
// - Actionable and specific
// - Based on the data and trends identified
// - Focused on competitive advantage
// - 1-2 sentences each

// Format your response EXACTLY as:

// GRAPH_DATA:
// [Your graph data here]

// DETAILED_CONTENT:
// [Your detailed content here]

// KEY_INSIGHTS:
// • [Insight 1]
// • [Insight 2]
// • [Insight 3]
// • [Insight 4]
// • [Insight 5]

// Be comprehensive, specific, and ensure each section provides unique value while maintaining consistency across all three responses.`;

//       console.log(`🔄 Sending comprehensive prompt to GPT-4...`);
//       const response = await openai.invoke(comprehensivePrompt);
//       const fullResponse = response.content || response;

//       // Parse the response into three sections
//       const sections = this.parseComprehensiveResponse(fullResponse, graphType);
      
//       console.log(`✅ Generated comprehensive response for ${subCategoryName}`);
//       console.log(`   Graph data: ${sections.graph ? 'Generated' : 'Failed'}`);
//       console.log(`   Content: ${sections.content ? sections.content.length + ' chars' : 'Failed'}`);
//       console.log(`   Insights: ${sections.insights ? sections.insights.length + ' points' : 'Failed'}`);
      
//       return sections;
      
//     } catch (error) {
//       console.error(`Error generating comprehensive response:`, error);
//       return this.getFallbackResponse(subCategoryName, graphType);
//     }
//   }

//   // Parse comprehensive response into sections
//   parseComprehensiveResponse(fullResponse, graphType) {
//     try {
//       const sections = {
//         graph: '',
//         content: '',
//         insights: []
//       };

//       // Split response by sections
//       const graphMatch = fullResponse.match(/GRAPH_DATA:\s*(.*?)(?=\n\nDETAILED_CONTENT:|\n\nKEY_INSIGHTS:|$)/s);
//       const contentMatch = fullResponse.match(/DETAILED_CONTENT:\s*(.*?)(?=\n\nKEY_INSIGHTS:|$)/s);
//       const insightsMatch = fullResponse.match(/KEY_INSIGHTS:\s*(.*?)$/s);

//       // Extract graph data
//       if (graphMatch) {
//         sections.graph = graphMatch[1].trim();
//       }

//       // Extract content
//       if (contentMatch) {
//         sections.content = contentMatch[1].trim();
//       }

//       // Extract insights
//       if (insightsMatch) {
//         const insightText = insightsMatch[1].trim();
//         const insightLines = insightText.split('\n')
//           .map(line => line.trim())
//           .filter(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))
//           .map(line => line.replace(/^[•\-*]\s*/, '').trim())
//           .filter(line => line.length > 0);
        
//         sections.insights = insightLines.slice(0, 5); // Ensure max 5 insights
//       }

//       // Validate and provide fallbacks
//       if (!sections.graph || sections.graph.length < 10) {
//         sections.graph = this.getFallbackGraphData(graphType);
//       }

//       if (!sections.content || sections.content.length < 100) {
//         sections.content = `Based on available data, this analysis provides insights into ${graphType} trends in the legal software market. The data shows various patterns and competitive positioning among vendors in this space.`;
//       }

//       if (sections.insights.length === 0) {
//         sections.insights = [
//           "Market shows strong demand for AI-powered legal solutions",
//           "Integration capabilities are becoming essential for vendor success",
//           "User experience and simplicity drive adoption rates",
//           "Compliance and security features are table stakes",
//           "Scalability and customization differentiate market leaders"
//         ];
//       }

//       return sections;

//     } catch (error) {
//       console.error('Error parsing comprehensive response:', error);
//       return this.getFallbackResponse('', graphType);
//     }
//   }

//   // Get fallback response when main generation fails
//   getFallbackResponse(subCategoryName, graphType) {
//     const fallbackGraphData = {
//       'bar': 'AI Features: 15, Workflow Automation: 12, Document Management: 18, Analytics: 10, Integration: 14',
//       'line': 'Q1: 25, Q2: 30, Q3: 35, Q4: 40, Q5: 45',
//       'pie': 'CLM: 35%, Legal AI: 25%, Document Mgmt: 25%, E-discovery: 15%',
//       'scatter': 'SpotDraft: (8.5, 2000), Harvey: (9.0, 2500), ContractWorks: (7.0, 1500)',
//       'area': 'Jan: 100, Feb: 150, Mar: 200, Apr: 250, May: 300'
//     };

//     return {
//       graph: fallbackGraphData[graphType] || fallbackGraphData['bar'],
//       content: `Analysis of ${subCategoryName} shows significant market trends and competitive dynamics. The legal software market continues to evolve with increasing adoption of AI-powered solutions, enhanced workflow automation, and improved user experiences. Key players are focusing on integration capabilities and compliance features to maintain competitive advantage.`,
//       insights: [
//         "AI-powered features are becoming standard across legal software platforms",
//         "Integration capabilities with existing systems drive vendor selection",
//         "User experience and interface design significantly impact adoption rates",
//         "Compliance and security features are essential for enterprise customers",
//         "Scalability and customization options differentiate market leaders"
//       ]
//     };
//   }

//   // Generate fallback graph data
//   getFallbackGraphData(graphType) {
//     const fallbackData = {
//       'bar': 'Feature A: 15, Feature B: 12, Feature C: 18, Feature D: 10, Feature E: 14',
//       'line': 'Q1: 25, Q2: 30, Q3: 35, Q4: 40, Q5: 45',
//       'pie': 'Category A: 35%, Category B: 25%, Category C: 25%, Category D: 15%',
//       'scatter': 'Vendor A: (8.5, 2000), Vendor B: (9.0, 2500), Vendor C: (7.0, 1500)',
//       'area': 'Period 1: 100, Period 2: 150, Period 3: 200, Period 4: 250'
//     };
    
//     return fallbackData[graphType] || fallbackData['bar'];
//   }

//   // Process insights structure with new flow
//   async processInsights(insights, miData) {
//     const results = { ...insights };
    
//     console.log('🚀 Starting Advanced AI Analysis Workflow (Updated Structure)...');
    
//     // Iterate through main categories
//     for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
//       console.log(`\n📋 Processing main category: ${mainCategory}`);
      
//       // Iterate through sub-categories
//       for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
//         console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
//         const { database, prompt, fields, graph, content, insights: insightsObj } = subCategoryConfig;
        
//         if (!prompt || !fields || !graph) {
//           console.log(`⚠️  Missing required fields for ${subCategory}, skipping...`);
//           continue;
//         }

//         // Get combined miData sources based on database config
//         const combinedSources = this.getCombinedMiDataSources(database, miData);
        
//         console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
        
//         // Process content from combined sources
//         const processedResult = await this.processContentForSubCategory(subCategory, combinedSources);
        
//         console.log(`📊 Processing result: ${processedResult.message}`);
        
//         // Create RAG for sub-category
//         const ragResult = await this.createSubCategoryRAG(subCategory, processedResult);
        
//         console.log(`📊 RAG result: ${ragResult.message}`);
        
//         // Query RAG for context
//         const ragContext = await this.querySubCategoryRAG(subCategory, prompt);
        
//         // Query database for context
//         const dbContext = await this.queryDatabase(fields, subCategory);
        
//         // Generate comprehensive response for all three objects
//         const comprehensiveResponse = await this.generateComprehensiveResponse(
//           subCategory, 
//           prompt, 
//           fields, 
//           graph.type, 
//           ragContext, 
//           dbContext
//         );
        
//         // Update results structure
//         results[mainCategory][subCategory].graph.response = comprehensiveResponse.graph;
//         results[mainCategory][subCategory].content.response = comprehensiveResponse.content;
//         results[mainCategory][subCategory].insights.response = comprehensiveResponse.insights;
        
//         // Add heading if not present
//         if (!results[mainCategory][subCategory].graph.heading) {
//           results[mainCategory][subCategory].graph.heading = `${subCategory} - Graph Analysis`;
//         }
//         if (!results[mainCategory][subCategory].content.heading) {
//           results[mainCategory][subCategory].content.heading = `${subCategory} - Detailed Analysis`;
//         }
//         if (!results[mainCategory][subCategory].insights.heading) {
//           results[mainCategory][subCategory].insights.heading = `${subCategory} - Key Insights`;
//         }
        
//         console.log(`✅ Generated comprehensive response for ${subCategory}`);
//         console.log(`   📊 Graph: ${comprehensiveResponse.graph ? 'Generated' : 'Failed'}`);
//         console.log(`   📝 Content: ${comprehensiveResponse.content ? `${comprehensiveResponse.content.length} chars` : 'Failed'}`);
//         console.log(`   💡 Insights: ${comprehensiveResponse.insights ? `${comprehensiveResponse.insights.length} points` : 'Failed'}`);
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
      
//       if (!insights || !miData) {
//         throw new Error('Missing required fields: insights and miData');
//       }

//       console.log('=== ADVANCED MI ANALYSIS STARTED (UPDATED STRUCTURE) ===');
      
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
//           message: 'Analysis completed with updated structure using single prompt per sub-category',
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
    
//     console.log('=== ADVANCED MI ANALYSE API CALLED (UPDATED STRUCTURE) ===');
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
//         message: 'Advanced analysis completed successfully with updated structure',
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

// Updated to use GPT-4 with extended output size
const openai = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
  modelName: 'gpt-4',
  maxTokens: 4000, // Extended output size
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

  // Get combined miData sources based on database field
  getCombinedMiDataSources(databaseConfig, miData) {
    const combinedSources = [];
    
    if (!databaseConfig || !miData || Object.keys(databaseConfig).length === 0) {
      console.log('⚠️  No database config or miData available');
      return combinedSources;
    }

    // Loop through each top category in database config
    for (const [topCategory, subCategories] of Object.entries(databaseConfig)) {
      console.log(`🔍 Processing top category: ${topCategory}`);
      
      // Check if this top category exists in miData
      if (miData[topCategory]) {
        // Loop through each sub category to combine
        for (const subCategory of subCategories) {
          console.log(`  📋 Adding sub category: ${subCategory}`);
          
          if (miData[topCategory][subCategory]) {
            combinedSources.push({
              topCategory,
              subCategory,
              data: miData[topCategory][subCategory]
            });
          }
        }
      }
    }
    
    return combinedSources;
  }

  // Process content for a sub-category using combined sources
  async processContentForSubCategory(subCategoryName, combinedSources) {
    const allContent = [];
    const tempDir = path.join(process.cwd(), 'temp');
    const processingStats = {
      totalSources: combinedSources.length,
      pdfCount: 0,
      articleCount: 0,
      processedPdfs: 0,
      processedArticles: 0,
      errors: []
    };

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      console.log(`🔍 Processing content for sub-category: ${subCategoryName}`);
      console.log(`📊 Combined sources count: ${combinedSources.length}`);

      // If no sources available, return empty but don't fail
      if (combinedSources.length === 0) {
        console.log(`⚠️  No sources available for ${subCategoryName}`);
        return {
          content: [],
          stats: processingStats,
          message: `No sources available for ${subCategoryName}`
        };
      }

      for (const source of combinedSources) {
        const { topCategory, subCategory, data } = source;
        console.log(`  📂 Processing: ${topCategory}/${subCategory}`);

        // Count available sources
        const hasPdfs = data.pdflinks && data.pdflinks.length > 0;
        const hasArticles = data.articlelinks && data.articlelinks.length > 0;
        
        if (hasPdfs) processingStats.pdfCount += data.pdflinks.length;
        if (hasArticles) processingStats.articleCount += data.articlelinks.length;

        console.log(`    📄 PDFs available: ${hasPdfs ? data.pdflinks.length : 0}`);
        console.log(`    📰 Articles available: ${hasArticles ? data.articlelinks.length : 0}`);

        // Process PDFs if available
        if (hasPdfs) {
          console.log(`    🔄 Processing ${data.pdflinks.length} PDFs...`);
          
          for (const pdfUrl of data.pdflinks) {
            if (!this.isValidUrl(pdfUrl)) {
              console.log(`    ❌ Invalid PDF URL: ${pdfUrl}`);
              processingStats.errors.push(`Invalid PDF URL: ${pdfUrl}`);
              continue;
            }

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
                processingStats.processedPdfs++;
                console.log(`    ✅ PDF processed: ${pdfUrl.substring(0, 50)}...`);
              } else {
                console.log(`    ⚠️  PDF content too short or empty: ${pdfUrl}`);
                processingStats.errors.push(`PDF content too short: ${pdfUrl}`);
              }

              // Clean up temp file
              if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
              }
            } catch (error) {
              console.error(`    ❌ Error processing PDF ${pdfUrl}:`, error.message);
              processingStats.errors.push(`PDF processing error: ${pdfUrl} - ${error.message}`);
            }
          }
        } else {
          console.log(`    ⚠️  No PDFs available for ${topCategory}/${subCategory}`);
        }

        // Process articles if available
        if (hasArticles) {
          console.log(`    🔄 Processing ${data.articlelinks.length} articles...`);
          
          const validUrls = data.articlelinks.filter(url => this.isValidUrl(url));
          
          if (validUrls.length > 0) {
            console.log(`    📰 Valid article URLs: ${validUrls.length}/${data.articlelinks.length}`);
            
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
                  processingStats.processedArticles++;
                  console.log(`    ✅ Article processed: ${item.title || item.url.substring(0, 50)}...`);
                } else {
                  console.log(`    ⚠️  Article content too short: ${item.url}`);
                  processingStats.errors.push(`Article content too short: ${item.url}`);
                }
              });
            } catch (error) {
              console.error(`    ❌ Error processing articles for ${topCategory}/${subCategory}:`, error.message);
              processingStats.errors.push(`Article processing error: ${topCategory}/${subCategory} - ${error.message}`);
            }
          } else {
            console.log(`    ⚠️  No valid article URLs found`);
            processingStats.errors.push(`No valid article URLs in ${topCategory}/${subCategory}`);
          }
        } else {
          console.log(`    ⚠️  No articles available for ${topCategory}/${subCategory}`);
        }
      }

      // Summary of processing
      console.log(`\n📊 Processing Summary for ${subCategoryName}:`);
      console.log(`   Total sources: ${processingStats.totalSources}`);
      console.log(`   PDFs: ${processingStats.processedPdfs}/${processingStats.pdfCount} processed`);
      console.log(`   Articles: ${processingStats.processedArticles}/${processingStats.articleCount} processed`);
      console.log(`   Total content items: ${allContent.length}`);
      console.log(`   Errors: ${processingStats.errors.length}`);
      
      if (processingStats.errors.length > 0) {
        console.log(`   Error details:`, processingStats.errors.slice(0, 3));
      }

    } finally {
      // Clean up temp directory
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }

    return {
      content: allContent,
      stats: processingStats,
      message: allContent.length > 0 ? 
        `Successfully processed ${allContent.length} content items` : 
        'No content could be processed from available sources'
    };
  }

  // Create sub-category-specific Pinecone index and store content
  async createSubCategoryRAG(subCategoryName, processedResult) {
    try {
      const { content: processedContent, stats, message } = processedResult;
      
      // If no content was processed, return no RAG
      if (processedContent.length === 0) {
        console.log(`⚠️  No content to create RAG for ${subCategoryName}: ${message}`);
        return {
          vectorCount: 0,
          status: 'no_content',
          message: message,
          stats: stats
        };
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
      return {
        vectorCount: vectors.length,
        status: 'success',
        message: `Successfully created RAG with ${vectors.length} vectors`,
        stats: stats
      };
    } catch (error) {
      console.error(`Error creating RAG for ${subCategoryName}:`, error);
      return {
        vectorCount: 0,
        status: 'error',
        message: `Error creating RAG: ${error.message}`,
        stats: stats || {}
      };
    }
  }

  // Enhanced database query with better mock data
  async queryDatabase(fields, subCategoryName) {
    try {
      // TODO: Replace with actual Prisma query based on fields
      // const products = await prisma.legalSoftware.findMany({
      //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      // });

      // Enhanced mock data for better responses
      const mockData = {
        keyFeatures: "AI Analysis: 4 vendors, E-signatures: 8 vendors, Workflow Automation: 7 vendors, Collaboration: 8 vendors, Document Management: 6 vendors, Template Library: 9 vendors, Contract Analytics: 5 vendors, Approval Workflows: 7 vendors, Integration APIs: 6 vendors, Custom Fields: 8 vendors",
        category: "Contract Lifecycle Management: 12 vendors, Legal AI: 8 vendors, Document Management: 10 vendors, E-discovery: 6 vendors, IP Management: 4 vendors, Legal Research: 7 vendors, Litigation Management: 5 vendors",
        coreFunctionalities: "Contract Creation: 8 vendors, Negotiation: 7 vendors, Analytics: 6 vendors, Repository: 8 vendors, AI Analysis: 5 vendors, Approval Management: 9 vendors, Compliance Tracking: 6 vendors",
        topUseCases: "Contract automation: 8 vendors, Legal team collaboration: 7 vendors, Compliance management: 6 vendors, Document workflow: 8 vendors, Risk assessment: 4 vendors, Due diligence: 5 vendors",
        userSatisfaction: "High satisfaction: 5 vendors, Good ratings: 7 vendors, Strong support: 6 vendors, Average rating 4.2/5: 8 vendors, User-friendly: 9 vendors",
        bestKnownFor: "Innovation: SpotDraft, Simplicity: ContractWorks, Usability: PandaDoc, Reliability: DocuSign, AI Power: Harvey, Speed: Ironclad, Security: Agiloft, Integration: Salesforce CLM",
        criticalOpinions: "UI complexity: 3 vendors, Template limitations: 2 vendors, Pricing transparency: 4 vendors, Integration challenges: 2 vendors, Learning curve: 3 vendors, Limited customization: 4 vendors",
        caseStudies: "SpotDraft: 90% cycle time reduction, ContractWorks: 85% compliance improvement, PandaDoc: 70% faster approvals, DocuSign: 95% digital adoption, Harvey: 60% research time saved, Ironclad: 80% error reduction"
      };

      console.log(`🔍 Querying database for fields: ${fields.join(', ')} for ${subCategoryName}`);
      
      const contextData = fields.map(field => `${field}: ${mockData[field] || 'Data not available in current database'}`).join('\n');
      
      return contextData;
      
    } catch (error) {
      console.error('Error querying database:', error);
      return `Error querying database: ${error.message}`;
    }
  }

  // Query sub-category RAG for context
  async querySubCategoryRAG(subCategoryName, prompt) {
    try {
      const index = this.subCategoryIndexes.get(subCategoryName);
      if (!index) {
        console.log(`⚠️  No RAG index found for sub-category: ${subCategoryName}`);
        return {
          response: "No processed content available for this sub-category.",
          status: 'no_index',
          hasContent: false
        };
      }

      const questionEmbedding = await embeddings.embedQuery(prompt);
      
      const searchResults = await index.query({
        vector: questionEmbedding,
        topK: 10, // Increased for better context
        includeMetadata: true,
        includeValues: false
      });

      const relevantMatches = searchResults.matches.filter(match => match.score > 0.7);
      
      if (relevantMatches.length === 0) {
        console.log(`⚠️  No relevant matches found for: ${prompt}`);
        return {
          response: "No relevant content found in the processed documents.",
          status: 'no_matches',
          hasContent: false
        };
      }

      const context = relevantMatches
        .map(match => match.metadata.chunk_text)
        .join('\n\n');

      return {
        response: context,
        status: 'success',
        hasContent: true,
        matchCount: relevantMatches.length
      };
      
    } catch (error) {
      console.error(`Error querying RAG for ${subCategoryName}:`, error);
      return {
        response: `Error querying processed content: ${error.message}`,
        status: 'error',
        hasContent: false
      };
    }
  }

  // Generate comprehensive response and format for all three objects
  async generateComprehensiveResponse(subCategoryName, prompt, fields, graphType, ragContext, dbContext) {
    try {
      console.log(`🤖 Generating comprehensive response for: ${subCategoryName}`);
      
      // Build context from both RAG and database
      let contextSection = '';
      
      if (ragContext.hasContent) {
        contextSection += `PROCESSED CONTENT CONTEXT:\n${ragContext.response}\n\n`;
      }
      
      if (dbContext && dbContext.trim().length > 0) {
        contextSection += `DATABASE CONTEXT:\n${dbContext}\n\n`;
      }
      
      if (!contextSection) {
        contextSection = `LIMITED CONTEXT: Using general knowledge about legal software for ${subCategoryName}.\n\n`;
      }

      // Create comprehensive prompt for all three responses
      const graphFormat = this.getGraphFormat(graphType);
      
      const comprehensivePrompt = `You are an expert legal technology analyst. Based on the following context, provide a comprehensive response to: "${prompt}"

${FUNCTIONALITY_CONSTRAINTS}

${contextSection}

IMPORTANT: You must provide your response in the following THREE sections:

1. GRAPH_DATA: Provide data in ${graphType.toUpperCase()} format
${graphFormat.instruction}
Required format: ${graphFormat.format}
Example: ${graphFormat.example}

2. DETAILED_CONTENT: Provide exactly 6-8 detailed bullet points that include:
- Specific examples and data points
- Market trends and insights
- Vendor comparisons where relevant
- Industry implications
- Technical details and implementation considerations
Each bullet point should be 2-3 sentences long and provide comprehensive information.

3. KEY_INSIGHTS: Provide exactly 5 bullet points with strategic insights for vendors, each point should be:
- Actionable and specific
- Based on the data and trends identified
- Focused on competitive advantage
- 1-2 sentences each

Format your response EXACTLY as:

GRAPH_DATA:
[Your graph data here]

DETAILED_CONTENT:
• [Detailed point 1 with comprehensive information]
• [Detailed point 2 with comprehensive information]
• [Detailed point 3 with comprehensive information]
• [Detailed point 4 with comprehensive information]
• [Detailed point 5 with comprehensive information]
• [Detailed point 6 with comprehensive information]

KEY_INSIGHTS:
• [Insight 1]
• [Insight 2]
• [Insight 3]
• [Insight 4]
• [Insight 5]

Be comprehensive, specific, and ensure each section provides unique value while maintaining consistency across all three responses.`;

      console.log(`🔄 Sending comprehensive prompt to GPT-4...`);
      const response = await openai.invoke(comprehensivePrompt);
      const fullResponse = response.content || response;

      // Parse the response into three sections
      const sections = this.parseComprehensiveResponse(fullResponse, graphType);
      
      console.log(`✅ Generated comprehensive response for ${subCategoryName}`);
      console.log(`   Graph data: ${sections.graph ? 'Generated' : 'Failed'}`);
      console.log(`   Content: ${sections.content ? sections.content.length + ' chars' : 'Failed'}`);
      console.log(`   Insights: ${sections.insights ? sections.insights.length + ' points' : 'Failed'}`);
      
      return sections;
      
    } catch (error) {
      console.error(`Error generating comprehensive response:`, error);
      return this.getFallbackResponse(subCategoryName, graphType);
    }
  }

  // Parse comprehensive response into sections
  parseComprehensiveResponse(fullResponse, graphType) {
    try {
      const sections = {
        graph: '',
        content: [],
        insights: []
      };

      // Split response by sections
      const graphMatch = fullResponse.match(/GRAPH_DATA:\s*(.*?)(?=\n\nDETAILED_CONTENT:|\n\nKEY_INSIGHTS:|$)/s);
      const contentMatch = fullResponse.match(/DETAILED_CONTENT:\s*(.*?)(?=\n\nKEY_INSIGHTS:|$)/s);
      const insightsMatch = fullResponse.match(/KEY_INSIGHTS:\s*(.*?)$/s);

      // Extract graph data
      if (graphMatch) {
        sections.graph = graphMatch[1].trim();
      }

      // Extract content as bullet points
      if (contentMatch) {
        const contentText = contentMatch[1].trim();
        const contentLines = contentText.split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))
          .map(line => line.replace(/^[•\-*]\s*/, '').trim())
          .filter(line => line.length > 0);
        
        sections.content = contentLines.slice(0, 8); // Ensure max 8 content points
      }

      // Extract insights
      if (insightsMatch) {
        const insightText = insightsMatch[1].trim();
        const insightLines = insightText.split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))
          .map(line => line.replace(/^[•\-*]\s*/, '').trim())
          .filter(line => line.length > 0);
        
        sections.insights = insightLines.slice(0, 5); // Ensure max 5 insights
      }

      // Validate and provide fallbacks
      if (!sections.graph || sections.graph.length < 10) {
        sections.graph = this.getFallbackGraphData(graphType);
      }

      if (sections.content.length === 0) {
        sections.content = [
          "Market analysis shows strong demand for advanced legal software solutions",
          "Integration capabilities are becoming essential for vendor competitiveness",
          "User experience and interface design significantly impact adoption rates",
          "Compliance and security features are table stakes for enterprise customers",
          "AI-powered features are differentiating market leaders from followers",
          "Scalability and customization options drive long-term vendor selection"
        ];
      }

      if (sections.insights.length === 0) {
        sections.insights = [
          "Market shows strong demand for AI-powered legal solutions",
          "Integration capabilities are becoming essential for vendor success",
          "User experience and simplicity drive adoption rates",
          "Compliance and security features are table stakes",
          "Scalability and customization differentiate market leaders"
        ];
      }

      return sections;

    } catch (error) {
      console.error('Error parsing comprehensive response:', error);
      return this.getFallbackResponse('', graphType);
    }
  }

  // Get fallback response when main generation fails
  getFallbackResponse(subCategoryName, graphType) {
    const fallbackGraphData = {
      'bar': 'AI Features: 15, Workflow Automation: 12, Document Management: 18, Analytics: 10, Integration: 14',
      'line': 'Q1: 25, Q2: 30, Q3: 35, Q4: 40, Q5: 45',
      'pie': 'CLM: 35%, Legal AI: 25%, Document Mgmt: 25%, E-discovery: 15%',
      'scatter': 'SpotDraft: (8.5, 2000), Harvey: (9.0, 2500), ContractWorks: (7.0, 1500)',
      'area': 'Jan: 100, Feb: 150, Mar: 200, Apr: 250, May: 300'
    };

    return {
      graph: fallbackGraphData[graphType] || fallbackGraphData['bar'],
      content: [
        `Analysis of ${subCategoryName} shows significant market trends and competitive dynamics in the legal software space`,
        "The legal software market continues to evolve with increasing adoption of AI-powered solutions and enhanced automation",
        "Key players are focusing on integration capabilities and compliance features to maintain competitive advantage",
        "User experience and interface design have become critical differentiators in vendor selection processes",
        "Cloud-based SaaS solutions are preferred over on-premise deployments for scalability and cost-effectiveness",
        "Advanced analytics and reporting capabilities are increasingly demanded by enterprise customers"
      ],
      insights: [
        "AI-powered features are becoming standard across legal software platforms",
        "Integration capabilities with existing systems drive vendor selection",
        "User experience and interface design significantly impact adoption rates",
        "Compliance and security features are essential for enterprise customers",
        "Scalability and customization options differentiate market leaders"
      ]
    };
  }

  // Generate fallback graph data
  getFallbackGraphData(graphType) {
    const fallbackData = {
      'bar': 'Feature A: 15, Feature B: 12, Feature C: 18, Feature D: 10, Feature E: 14',
      'line': 'Q1: 25, Q2: 30, Q3: 35, Q4: 40, Q5: 45',
      'pie': 'Category A: 35%, Category B: 25%, Category C: 25%, Category D: 15%',
      'scatter': 'Vendor A: (8.5, 2000), Vendor B: (9.0, 2500), Vendor C: (7.0, 1500)',
      'area': 'Period 1: 100, Period 2: 150, Period 3: 200, Period 4: 250'
    };
    
    return fallbackData[graphType] || fallbackData['bar'];
  }

  // Process insights structure with new flow
  async processInsights(insights, miData) {
    const results = { ...insights };
    
    console.log('🚀 Starting Advanced AI Analysis Workflow (Updated Structure)...');
    
    // Iterate through main categories
    for (const [mainCategory, mainCategoryConfig] of Object.entries(insights)) {
      console.log(`\n📋 Processing main category: ${mainCategory}`);
      
      // Iterate through sub-categories
      for (const [subCategory, subCategoryConfig] of Object.entries(mainCategoryConfig)) {
        console.log(`\n🔧 Processing sub-category: ${subCategory}`);
        
        const { database, prompt, fields, graph, content, insights: insightsObj } = subCategoryConfig;
        
        if (!prompt || !fields || !graph) {
          console.log(`⚠️  Missing required fields for ${subCategory}, skipping...`);
          continue;
        }

        // Get combined miData sources based on database config
        const combinedSources = this.getCombinedMiDataSources(database, miData);
        
        console.log(`📂 Combined ${combinedSources.length} sources for ${subCategory}`);
        
        // Process content from combined sources
        const processedResult = await this.processContentForSubCategory(subCategory, combinedSources);
        
        console.log(`📊 Processing result: ${processedResult.message}`);
        
        // Create RAG for sub-category
        const ragResult = await this.createSubCategoryRAG(subCategory, processedResult);
        
        console.log(`📊 RAG result: ${ragResult.message}`);
        
        // Query RAG for context
        const ragContext = await this.querySubCategoryRAG(subCategory, prompt);
        
        // Query database for context
        const dbContext = await this.queryDatabase(fields, subCategory);
        
        // Generate comprehensive response for all three objects
        const comprehensiveResponse = await this.generateComprehensiveResponse(
          subCategory, 
          prompt, 
          fields, 
          graph.type, 
          ragContext, 
          dbContext
        );
        
        // Update results structure
        results[mainCategory][subCategory].graph.response = comprehensiveResponse.graph;
        results[mainCategory][subCategory].graph.type = graph.type; // Add type to graph
        
        results[mainCategory][subCategory].content.response = comprehensiveResponse.content;
        results[mainCategory][subCategory].content.type = "point"; // Add type to content as point
        
        results[mainCategory][subCategory].insights.response = comprehensiveResponse.insights;
        results[mainCategory][subCategory].insights.type = "point"; // Add type to insights as point
        
        // Add heading if not present
        if (!results[mainCategory][subCategory].graph.heading) {
          results[mainCategory][subCategory].graph.heading = `${subCategory} - Graph Analysis`;
        }
        if (!results[mainCategory][subCategory].content.heading) {
          results[mainCategory][subCategory].content.heading = `${subCategory} - Detailed Analysis`;
        }
        if (!results[mainCategory][subCategory].insights.heading) {
          results[mainCategory][subCategory].insights.heading = `${subCategory} - Key Insights`;
        }
        
        console.log(`✅ Generated comprehensive response for ${subCategory}`);
        console.log(`   📊 Graph: ${comprehensiveResponse.graph ? 'Generated' : 'Failed'}`);
        console.log(`   📝 Content: ${comprehensiveResponse.content ? `${comprehensiveResponse.content.length} chars` : 'Failed'}`);
        console.log(`   💡 Insights: ${comprehensiveResponse.insights ? `${comprehensiveResponse.insights.length} points` : 'Failed'}`);
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
      
      if (!insights || !miData) {
        throw new Error('Missing required fields: insights and miData');
      }

      console.log('=== ADVANCED MI ANALYSIS STARTED (UPDATED STRUCTURE) ===');
      
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
          message: 'Analysis completed with updated structure using single prompt per sub-category',
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
    
    console.log('=== ADVANCED MI ANALYSE API CALLED (UPDATED STRUCTURE) ===');
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
        message: 'Advanced analysis completed successfully with updated structure',
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