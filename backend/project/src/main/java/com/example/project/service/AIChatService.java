package com.example.project.service;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIChatService {
    private final ChatClient chatClient;
    private final ChatMemory chatMemory;
    private final static String SYSYEM_INSTRUCTION= """
            אתה עוזר AI לעינייני היסטוריה של שירים וזמרים
            """;

    public AIChatService(ChatClient.Builder chatClient, ChatMemory chatMemory) {
        this.chatClient = chatClient.build();
        this.chatMemory=chatMemory;

    }

    public String getResponse(String prompt,String conversationId){
        List<Message> messageList=new ArrayList<>();
    //ההודעה הראשונה - ההנחיה הראשונית
       messageList.add(new SystemMessage(SYSYEM_INSTRUCTION));
    //מוסיפים את כל ההודעות ששייכות לאותה השיחה
       messageList.addAll(chatMemory.get(conversationId));
    //השאלה הנוכחית
    UserMessage userMessage=new UserMessage(prompt);
       messageList.add(userMessage);

    String aiResponse=chatClient.prompt().messages(messageList)
            .call().content();

    //שמירת התגובה בזכרון
    //התגובה של ה-AI
    AssistantMessage aiMessage=new AssistantMessage(aiResponse);

    List<Message> messageList1=List.of(userMessage,aiMessage);
    //מוסיפים לזכרון את השאלה והתשובה
    chatMemory.add(conversationId,messageList1);

    return aiResponse;
}

}
