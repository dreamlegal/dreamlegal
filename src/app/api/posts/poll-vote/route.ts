
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { postId, pollId, optionIndex, userId } = await request.json();
    
    if (!postId || optionIndex === undefined || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: postId, optionIndex, userId' },
        { status: 400 }
      );
    }
    
    console.log(`[POLL VOTE] Starting - Post: ${postId}, Poll: ${pollId}, Option: ${optionIndex}, User: ${userId}`);
    
    // First, get the current post data
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        content: true,
        poll: true
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Handle the standalone poll first (if it exists)
    let updatedPoll = post.poll;
    
    if (post.poll) {
      console.log(`[POLL VOTE] Processing standalone poll:`, post.poll);
      
      // Make a deep copy of the poll options
      const options = JSON.parse(JSON.stringify(post.poll.options || []));
      const isMultiselect = post.poll.isMultiselect;
      
      // For single-select polls, remove the user from all options first
      if (!isMultiselect) {
        options.forEach(opt => {
          if (!opt.voters) opt.voters = [];
          opt.voters = opt.voters.filter(id => id !== userId);
          opt.count = opt.voters.length;
        });
      }
      
      // Get the target option
      const option = options[optionIndex];
      if (option) {
        // Ensure voters array exists
        if (!option.voters) {
          option.voters = [];
        }
        
        // Check if user already voted for this option
        const alreadyVoted = option.voters.includes(userId);
        
        if (alreadyVoted) {
          // Remove the vote (toggle off)
          console.log(`[POLL VOTE] User ${userId} removing vote from option ${optionIndex}`);
          option.voters = option.voters.filter(id => id !== userId);
        } else {
          // Add the vote
          console.log(`[POLL VOTE] User ${userId} adding vote to option ${optionIndex}`);
          option.voters.push(userId);
        }
        
        // Update the count
        option.count = option.voters.length;
      }
      
      // Update the poll with new options
      updatedPoll = {
        ...post.poll,
        options
      };
    }
    
    // Now handle poll in content field (if it exists)
    let updatedContent = post.content;
    if (post.content) {
      try {
        console.log(`[POLL VOTE] Processing content block poll`);
        
        // Parse the content if it's a string
        const contentBlocks = typeof post.content === 'string' 
          ? JSON.parse(post.content) 
          : post.content;
          
        // Find the poll block with matching pollId
        let foundPollBlock = false;
        const contentWithUpdatedPolls = contentBlocks.map(block => {
          if (block.type === 'poll' && String(block.id) === String(pollId)) {
            foundPollBlock = true;
            console.log(`[POLL VOTE] Found poll in content blocks:`, block);
            
            // Make a deep copy of options
            const options = JSON.parse(JSON.stringify(block.content.options || []));
            const isMultiselect = block.content.isMultiselect;
            
            // For single-select polls, remove the user from all options first
            if (!isMultiselect) {
              options.forEach(opt => {
                if (!opt.voters) opt.voters = [];
                opt.voters = opt.voters.filter(id => id !== userId);
                opt.count = opt.voters.length;
              });
            }
            
            // Get the target option
            const option = options[optionIndex];
            if (!option) {
              console.error(`[POLL VOTE] Option index ${optionIndex} not found`);
              return block;
            }
            
            // Ensure voters array exists
            if (!option.voters) {
              option.voters = [];
            }
            
            // Check if user already voted for this option
            const alreadyVoted = option.voters.includes(userId);
            
            if (alreadyVoted) {
              // Remove the vote (toggle off)
              console.log(`[POLL VOTE] User ${userId} removing vote from content option ${optionIndex}`);
              option.voters = option.voters.filter(id => id !== userId);
            } else {
              // Add the vote
              console.log(`[POLL VOTE] User ${userId} adding vote to content option ${optionIndex}`);
              option.voters.push(userId);
            }
            
            // Update the count
            option.count = option.voters.length;
            
            // Return updated block
            return {
              ...block,
              content: {
                ...block.content,
                options
              }
            };
          }
          return block;
        });
        
        // Only update if we found and modified a poll
        if (foundPollBlock) {
          updatedContent = JSON.stringify(contentWithUpdatedPolls);
        } else {
          console.log(`[POLL VOTE] No matching poll found in content blocks with ID: ${pollId}`);
        }
      } catch (error) {
        console.error('[POLL VOTE] Error updating poll in content:', error);
      }
    }
    
    // Save the updated post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        content: updatedContent,
        poll: updatedPoll
      },
      select: {
        id: true,
        content: true,
        poll: true
      }
    });
    
    console.log(`[POLL VOTE] Updated post successfully`);
    
    return NextResponse.json({ 
      success: true, 
      poll: updatedPost.poll,
      updatedOptions: updatedPost.poll?.options || []
    });
    
  } catch (error) {
    console.error('[POLL VOTE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update poll vote: ' + error.message },
      { status: 500 }
    );
  }
}