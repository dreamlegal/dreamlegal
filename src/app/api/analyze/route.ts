// // app/api/analyze/route.ts (Updated with Prisma Storage)
// import { NextRequest, NextResponse } from 'next/server';
// import Exa from "exa-js";
// import OpenAI from "openai";
// import prisma from '@/lib/prisma'; // Adjust the import according to your project structure


// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { companyName } = body;
    
//     if (!companyName || typeof companyName !== 'string') {
//       return NextResponse.json(
//         { error: 'Company name is required' },
//         { status: 400 }
//       );
//     }
    
//     console.log(`🎯 API: Starting complete analysis for: ${companyName}`);
    
//     // Initialize clients
//     const exa = new Exa("72f1749d-b2aa-49a9-a81e-d1a8a1fc0833");
//     const openaiClient = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const exaClient = new OpenAI({
//       baseURL: "https://api.exa.ai",
//       apiKey: "72f1749d-b2aa-49a9-a81e-d1a8a1fc0833",
//     });
    
//     const results = {
//       companyName,
//       timestamp: new Date().toISOString(),
//       step1_searchAndContents: null,
//       step2_llmAnalysis: null,
//       step3_reviews: null,
//       debug: {
//         searchTime: 0,
//         llmTime: 0,
//         reviewsTime: 0,
//         errors: []
//       }
//     };
    
//     // STEP 1: Search and Contents
//     try {
//       console.log(`📊 STEP 1: Running exa.searchAndContents for: ${companyName}`);
//       const searchStart = Date.now();
      
//       const searchResult = await exa.searchAndContents(
//         `give me latest news articles and updates of ${companyName} company`,
//         {
//           text: true
//         }
//       );
      
//       results.step1_searchAndContents = searchResult;
//       results.debug.searchTime = Date.now() - searchStart;
      
//       console.log(`✅ STEP 1 completed in ${results.debug.searchTime}ms`);
//       console.log(`📄 Found ${searchResult.results?.length || 0} articles`);
      
//     } catch (error) {
//       console.error("❌ STEP 1 Error:", error);
//       results.debug.errors.push(`Step 1: ${error}`);
//     }
    
//     // STEP 2: LLM Analysis
//     try {
//       if (results.step1_searchAndContents?.results) {
//         console.log(`🧠 STEP 2: Processing articles with LLM...`);
//         const llmStart = Date.now();
        
//         // Extract all text content
//         const allTexts = results.step1_searchAndContents.results.map(result => result.text).join('\n\n');
        
//         console.log(`📝 Total text length: ${allTexts.length} characters`);
        
//         // LLM Analysis
//         const llmPrompt = `
//         Analyze these news articles about ${companyName} and provide:
        
//         1. Key insights as bullet points (not paragraph format)
//         2. Categorize each article into one of these categories:
//            - Funding
//            - Partnerships  
//            - Client wins
//            - Feature launches
//            - Geographic expansion
//            - Talent moves
//            - Reports
//            - Beta programs
//            - Event participation
//            - Miscellaneous
        
//         3. Count how many articles fall into each category
        
//         Return your response as JSON in this format:
//         {
//           "keyInsights": [
//             "• Key insight point 1",
//             "• Key insight point 2",
//             "• Key insight point 3"
//           ],
//           "articles": [
//             {
//               "title": "Article title",
//               "category": "Funding",
//               "keyPoints": ["point 1", "point 2"]
//             }
//           ],
//           "categoryCount": {
//             "Funding": 2,
//             "Partnerships": 1,
//             "Client wins": 0,
//             "Feature launches": 3,
//             "Geographic expansion": 0,
//             "Talent moves": 1,
//             "Reports": 2,
//             "Beta programs": 0,
//             "Event participation": 1,
//             "Miscellaneous": 0
//           }
//         }
        
//         Articles to analyze:
//         ${allTexts.substring(0, 50000)}
//         `;
        
//         const llmResponse = await openaiClient.chat.completions.create({
//           model: "gpt-4o",  // Changed to GPT-4o
//           messages: [
//             {
//               role: "user", 
//               content: llmPrompt
//             }
//           ],
//           response_format: { type: "json_object" },
//           max_tokens: 4000  // Added token limit
//         });
        
//         const llmAnalysis = JSON.parse(llmResponse.choices[0].message.content || '{}');
//         results.step2_llmAnalysis = llmAnalysis;
//         results.debug.llmTime = Date.now() - llmStart;
        
//         console.log(`✅ STEP 2 completed in ${results.debug.llmTime}ms`);
//         console.log(`📊 Categories found:`, Object.keys(llmAnalysis.categoryCount || {}));
        
//       } else {
//         console.log("⚠️ STEP 2 skipped - no articles found");
//       }
      
//     } catch (error) {
//       console.error("❌ STEP 2 Error:", error);
//       results.debug.errors.push(`Step 2: ${error}`);
//     }
    
//     // STEP 3: Company Reviews  
//     try {
//       console.log(`⭐ STEP 3: Getting reviews for: ${companyName}`);
//       const reviewsStart = Date.now();
      
//       const completion = await exaClient.chat.completions.create({
//         model: "exa",
//         messages: [
//           {
//             "role": "user",
//             "content": `give me reviews of company called ${companyName}`
//           }
//         ],
//         stream: true
//       });
      
//       let reviewsContent = "";
//       for await (const chunk of completion) {
//         const content = chunk.choices?.[0]?.delta?.content;
//         if (content) {
//           reviewsContent += content;
//         }
//       }
      
//       // Now process reviews with LLM to categorize into points
//       console.log(`🧠 STEP 3B: Processing reviews with LLM...`);
      
//       const reviewsLLMPrompt = `
//       Analyze these company reviews and convert them into categorized bullet points:
      
//       Categorize into:
//       - Positive: Good things about the company/product
//       - Negative: Issues, problems, or criticisms
//       - Neutral: Factual information without clear sentiment
      
//       Return as JSON in this format:
//       {
//         "reviewsSummary": {
//           "positive": [
//             "• Positive point 1",
//             "• Positive point 2"
//           ],
//           "negative": [
//             "• Negative point 1", 
//             "• Negative point 2"
//           ],
//           "neutral": [
//             "• Neutral fact 1",
//             "• Neutral fact 2"
//           ]
//         },
//         "reviewsCount": {
//           "positive": 5,
//           "negative": 2,
//           "neutral": 3
//         }
//       }
      
//       Reviews to analyze:
//       ${reviewsContent}
//       `;
      
//       const reviewsLLMResponse = await openaiClient.chat.completions.create({
//         model: "gpt-4o",
//         messages: [
//           {
//             role: "user",
//             content: reviewsLLMPrompt
//           }
//         ],
//         response_format: { type: "json_object" },
//         max_tokens: 2000
//       });
      
//       const processedReviews = JSON.parse(reviewsLLMResponse.choices[0].message.content || '{}');
      
//       results.step3_reviews = {
//         rawContent: reviewsContent,
//         rawLength: reviewsContent.length,
//         processedReviews: processedReviews
//       };
//       results.debug.reviewsTime = Date.now() - reviewsStart;
      
//       console.log(`✅ STEP 3 completed in ${results.debug.reviewsTime}ms`);
//       console.log(`📝 Reviews length: ${reviewsContent.length} characters`);
//       console.log(`📊 Reviews breakdown:`, processedReviews.reviewsCount || {});
      
//     } catch (error) {
//       console.error("❌ STEP 3 Error:", error);
//       results.debug.errors.push(`Step 3: ${error}`);
//     }
    
//     // 💾 STEP 4: Store in Database
//     try {
//       console.log(`💾 STEP 4: Storing analysis in database...`);
      
//       if (results.step2_llmAnalysis && results.step3_reviews) {
//         // Prepare articles data for database
//         const articlesData = results.step1_searchAndContents?.results?.map((article: any, index: number) => {
//           const analyzedArticle = results.step2_llmAnalysis?.articles?.find((a: any) => 
//             a.title && article.title && a.title.toLowerCase().includes(article.title.toLowerCase().substring(0, 20))
//           );
          
//           return {
//             title: article.title || `Article ${index + 1}`,
//             url: article.url || '',
//             category: analyzedArticle?.category || 'Uncategorized'
//           };
//         }) || [];
        
//         // Prepare reviews object for database
//         const reviewsData = {
//           positive: results.step3_reviews.processedReviews?.reviewsSummary?.positive || [],
//           negative: results.step3_reviews.processedReviews?.reviewsSummary?.negative || [],
//           neutral: results.step3_reviews.processedReviews?.reviewsSummary?.neutral || [],
//           rawContent: results.step3_reviews.rawContent || ''
//         };
        
//         // Store in database
//         const savedAnalysis = await prisma.companyAnalysis.create({
//           data: {
//             companyName: companyName,
//             totalArticlesCount: results.step1_searchAndContents?.results?.length || 0,
//             keyInsights: results.step2_llmAnalysis?.keyInsights || [],
//             reviews: reviewsData,
//             articles: {
//               create: articlesData
//             }
//           },
//           include: {
//             articles: true
//           }
//         });
        
//         console.log(`✅ STEP 4: Analysis saved to database with ID: ${savedAnalysis.id}`);
        
//         // Add database ID to results for reference
//         results.databaseId = savedAnalysis.id;
//       }
      
//     } catch (error) {
//       console.error("❌ STEP 4 Database Error:", error);
//       results.debug.errors.push(`Database: ${error}`);
//     }
    
//     // Final Results
//     const totalTime = results.debug.searchTime + results.debug.llmTime + results.debug.reviewsTime;
//     console.log(`🏁 COMPLETE ANALYSIS finished in ${totalTime}ms`);
//     console.log(`📊 Final results:`, {
//       articlesFound: results.step1_searchAndContents?.results?.length || 0,
//       categoriesAnalyzed: Object.keys(results.step2_llmAnalysis?.categoryCount || {}).length,
//       reviewsLength: results.step3_reviews?.rawLength || 0,
//       positiveReviews: results.step3_reviews?.processedReviews?.reviewsCount?.positive || 0,
//       negativeReviews: results.step3_reviews?.processedReviews?.reviewsCount?.negative || 0,
//       neutralReviews: results.step3_reviews?.processedReviews?.reviewsCount?.neutral || 0,
//       errors: results.debug.errors.length,
//       savedToDatabase: !!results.databaseId
//     });
    
//     return NextResponse.json(results);
    
//   } catch (error) {
//     console.error('🚨 API Error:', error);
//     return NextResponse.json(
//       { 
//         error: 'Internal server error', 
//         details: error instanceof Error ? error.message : 'Unknown error' 
//       },
//       { status: 500 }
//     );
//   }
// }
// app/api/analyze/route.ts (Enhanced with integrated categorization)
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";
import OpenAI from "openai";
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName } = body;
    
    if (!companyName || typeof companyName !== 'string') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }
    
    console.log(`🎯 API: Starting complete analysis for: ${companyName}`);
    
    // Initialize clients
    const exa = new Exa("72f1749d-b2aa-49a9-a81e-d1a8a1fc0833");
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const exaClient = new OpenAI({
      baseURL: "https://api.exa.ai",
      apiKey: "72f1749d-b2aa-49a9-a81e-d1a8a1fc0833",
    });
    
    const results = {
      companyName,
      timestamp: new Date().toISOString(),
      step1_searchAndContents: null,
      step2_llmAnalysis: null,
      step3_reviews: null,
      step4_categorization: null,
      debug: {
        searchTime: 0,
        llmTime: 0,
        reviewsTime: 0,
        categorizationTime: 0,
        errors: []
      }
    };
    
    // STEP 1: Search and Contents
    try {
      console.log(`📊 STEP 1: Running exa.searchAndContents for: ${companyName}`);
      const searchStart = Date.now();
      
      const searchResult = await exa.searchAndContents(
        `give me latest news articles and updates of ${companyName} company`,
        {
          text: true
        }
      );
      
      results.step1_searchAndContents = searchResult;
      results.debug.searchTime = Date.now() - searchStart;
      
      console.log(`✅ STEP 1 completed in ${results.debug.searchTime}ms`);
      console.log(`📄 Found ${searchResult.results?.length || 0} articles`);
      
    } catch (error) {
      console.error("❌ STEP 1 Error:", error);
      results.debug.errors.push(`Step 1: ${error}`);
    }
    
    // STEP 2: LLM Analysis (General Insights Only)
    try {
      if (results.step1_searchAndContents?.results) {
        console.log(`🧠 STEP 2: Processing articles for general insights...`);
        const llmStart = Date.now();
        
        // Extract all text content
        const allTexts = results.step1_searchAndContents.results.map(result => result.text).join('\n\n');
        
        console.log(`📝 Total text length: ${allTexts.length} characters`);
        
        // LLM Analysis for general insights only
        const llmPrompt = `
        Analyze these news articles about ${companyName} and provide key insights as bullet points.
        
        Focus on:
        - Major developments and trends
        - Business performance indicators
        - Strategic moves and decisions
        - Market positioning changes
        
        Return your response as JSON in this format:
        {
          "keyInsights": [
            "• Key insight point 1",
            "• Key insight point 2",
            "• Key insight point 3"
          ]
        }
        
        Articles to analyze:
        ${allTexts.substring(0, 50000)}
        `;
        
        const llmResponse = await openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user", 
              content: llmPrompt
            }
          ],
          response_format: { type: "json_object" },
          max_tokens: 2000
        });
        
        const llmAnalysis = JSON.parse(llmResponse.choices[0].message.content || '{}');
        results.step2_llmAnalysis = llmAnalysis;
        results.debug.llmTime = Date.now() - llmStart;
        
        console.log(`✅ STEP 2 completed in ${results.debug.llmTime}ms`);
        
      } else {
        console.log("⚠️ STEP 2 skipped - no articles found");
      }
      
    } catch (error) {
      console.error("❌ STEP 2 Error:", error);
      results.debug.errors.push(`Step 2: ${error}`);
    }
    
    // STEP 3: Company Reviews  
    try {
      console.log(`⭐ STEP 3: Getting reviews for: ${companyName}`);
      const reviewsStart = Date.now();
      
      const completion = await exaClient.chat.completions.create({
        model: "exa",
        messages: [
          {
            "role": "user",
            "content": `give me reviews of company called ${companyName}`
          }
        ],
        stream: true
      });
      
      let reviewsContent = "";
      for await (const chunk of completion) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          reviewsContent += content;
        }
      }
      
      // Process reviews with LLM to categorize into points
      console.log(`🧠 STEP 3B: Processing reviews with LLM...`);
      
      const reviewsLLMPrompt = `
      Analyze these company reviews and convert them into categorized bullet points:
      
      Categorize into:
      - Positive: Good things about the company/product
      - Negative: Issues, problems, or criticisms
      - Neutral: Factual information without clear sentiment
      
      Return as JSON in this format:
      {
        "reviewsSummary": {
          "positive": [
            "• Positive point 1",
            "• Positive point 2"
          ],
          "negative": [
            "• Negative point 1", 
            "• Negative point 2"
          ],
          "neutral": [
            "• Neutral fact 1",
            "• Neutral fact 2"
          ]
        },
        "reviewsCount": {
          "positive": 5,
          "negative": 2,
          "neutral": 3
        }
      }
      
      Reviews to analyze:
      ${reviewsContent}
      `;
      
      const reviewsLLMResponse = await openaiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: reviewsLLMPrompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });
      
      const processedReviews = JSON.parse(reviewsLLMResponse.choices[0].message.content || '{}');
      
      results.step3_reviews = {
        rawContent: reviewsContent,
        rawLength: reviewsContent.length,
        processedReviews: processedReviews
      };
      results.debug.reviewsTime = Date.now() - reviewsStart;
      
      console.log(`✅ STEP 3 completed in ${results.debug.reviewsTime}ms`);
      console.log(`📝 Reviews length: ${reviewsContent.length} characters`);
      console.log(`📊 Reviews breakdown:`, processedReviews.reviewsCount || {});
      
    } catch (error) {
      console.error("❌ STEP 3 Error:", error);
      results.debug.errors.push(`Step 3: ${error}`);
    }
    
    // 🏷️ STEP 4: Enhanced Article Categorization
    let categorizedArticles = [];
    
    try {
      if (results.step1_searchAndContents?.results) {
        console.log(`🏷️ STEP 4: Categorizing articles with enhanced method...`);
        const categorizeStart = Date.now();
        
        const articles = results.step1_searchAndContents.results;
        
        // Process articles in batches of 10 (copied from categorization API)
        const batchSize = 10;
        let processed = 0;
        
        for (let i = 0; i < articles.length; i += batchSize) {
          const batch = articles.slice(i, i + batchSize);
          
          console.log(`📊 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(articles.length / batchSize)}`);
          
          // Create prompt for this batch
          const articlesText = batch.map((article, index) => 
            `${index + 1}. Title: "${article.title}" URL: ${article.url}`
          ).join('\n');
          
          const prompt = `
          Categorize these articles into one of these categories ONLY:
          - Funding
          - Partnerships
          - Client wins
          - Feature launches
          - Geographic expansion
          - Talent moves
          - Reports
          - Beta programs
          - Event participation
          - Miscellaneous
          
          For each article, determine the most appropriate category based on the title and URL.
          If unsure, use "Miscellaneous".
          
          Return JSON in this exact format:
          {
            "categorizations": [
              {
                "articleIndex": 1,
                "category": "Funding"
              },
              {
                "articleIndex": 2,
                "category": "Partnerships"
              }
            ]
          }
          
          Articles to categorize:
          ${articlesText}
          `;
          
          try {
            const response = await openaiClient.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: prompt
                }
              ],
              response_format: { type: "json_object" },
              max_tokens: 1000
            });
            
            const result = JSON.parse(response.choices[0].message.content || '{}');
            const categorizations = result.categorizations || [];
            
            // Map categorizations back to articles
            for (const cat of categorizations) {
              const articleIndex = cat.articleIndex - 1; // Convert to 0-based index
              if (articleIndex >= 0 && articleIndex < batch.length) {
                const article = batch[articleIndex];
                categorizedArticles.push({
                  title: article.title || `Article ${processed + articleIndex + 1}`,
                  url: article.url || '',
                  category: cat.category || 'Miscellaneous'
                });
              }
            }
            
            processed += batch.length;
            
            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (batchError) {
            console.error(`❌ Error processing batch ${i / batchSize + 1}:`, batchError);
            
            // Fallback: set articles to Miscellaneous
            for (const article of batch) {
              categorizedArticles.push({
                title: article.title || `Article ${processed + 1}`,
                url: article.url || '',
                category: 'Miscellaneous'
              });
              processed++;
            }
          }
        }
        
        // Calculate category counts
        const categoryCount = categorizedArticles.reduce((acc, article) => {
          acc[article.category] = (acc[article.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        results.step4_categorization = {
          articles: categorizedArticles,
          categoryCount,
          totalProcessed: processed
        };
        
        results.debug.categorizationTime = Date.now() - categorizeStart;
        
        console.log(`✅ STEP 4 completed in ${results.debug.categorizationTime}ms`);
        console.log(`📊 Categories found:`, Object.keys(categoryCount));
        console.log(`📈 Category distribution:`, categoryCount);
        
      } else {
        console.log("⚠️ STEP 4 skipped - no articles found");
      }
      
    } catch (error) {
      console.error("❌ STEP 4 Error:", error);
      results.debug.errors.push(`Step 4: ${error}`);
    }
    
    // 💾 STEP 5: Store in Database
    try {
      console.log(`💾 STEP 5: Storing analysis in database...`);
      
      if (results.step2_llmAnalysis && results.step3_reviews) {
        // Use categorized articles if available, otherwise fallback
        const articlesData = categorizedArticles.length > 0 
          ? categorizedArticles 
          : results.step1_searchAndContents?.results?.map((article: any, index: number) => ({
              title: article.title || `Article ${index + 1}`,
              url: article.url || '',
              category: 'Miscellaneous'
            })) || [];
        
        // Prepare reviews object for database
        const reviewsData = {
          positive: results.step3_reviews.processedReviews?.reviewsSummary?.positive || [],
          negative: results.step3_reviews.processedReviews?.reviewsSummary?.negative || [],
          neutral: results.step3_reviews.processedReviews?.reviewsSummary?.neutral || [],
          rawContent: results.step3_reviews.rawContent || ''
        };
        
        // Store in database
        const savedAnalysis = await prisma.companyAnalysis.create({
          data: {
            companyName: companyName,
            totalArticlesCount: results.step1_searchAndContents?.results?.length || 0,
            keyInsights: results.step2_llmAnalysis?.keyInsights || [],
            reviews: reviewsData,
            articles: {
              create: articlesData
            }
          },
          include: {
            articles: true
          }
        });
        
        console.log(`✅ STEP 5: Analysis saved to database with ID: ${savedAnalysis.id}`);
        
        // Add database ID to results for reference
        results.databaseId = savedAnalysis.id;
      }
      
    } catch (error) {
      console.error("❌ STEP 5 Database Error:", error);
      results.debug.errors.push(`Database: ${error}`);
    }
    
    // Final Results
    const totalTime = results.debug.searchTime + results.debug.llmTime + results.debug.reviewsTime + results.debug.categorizationTime;
    console.log(`🏁 COMPLETE ANALYSIS finished in ${totalTime}ms`);
    console.log(`📊 Final results:`, {
      articlesFound: results.step1_searchAndContents?.results?.length || 0,
      articlesCategories: categorizedArticles.length,
      categoryDistribution: results.step4_categorization?.categoryCount || {},
      reviewsLength: results.step3_reviews?.rawLength || 0,
      positiveReviews: results.step3_reviews?.processedReviews?.reviewsCount?.positive || 0,
      negativeReviews: results.step3_reviews?.processedReviews?.reviewsCount?.negative || 0,
      neutralReviews: results.step3_reviews?.processedReviews?.reviewsCount?.neutral || 0,
      errors: results.debug.errors.length,
      savedToDatabase: !!results.databaseId
    });
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('🚨 API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}