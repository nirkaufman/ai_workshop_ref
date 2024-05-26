# Semantic search basics

## What is semantic search?

Semantic search is a data searching technique in a which a search query aims to not only find keywords, 
but to determine the intent and contextual meaning of the words a person is using for search.

Standard search, on the other hand, is based on finding exact matches of the search keywords. 
It doesn't consider the context or the intent behind the words.

Semantic search provides more accurate and relevant results by understanding the 
intent and context behind search queries.

## Intro to vectors and embeddings

In AI and Language Models, vectors and embeddings are essential.
Vectors in AI encode data features. They can represent words, 
sentences, or documents in language models.  Embeddings are vectors that 
represent discrete variables like words in a continuous vector space, 
capturing semantic relationships.  Word embeddings in language models capture word meanings. For instance, the vector for "king" minus "man" plus "woman" should be close to "queen".  Embeddings are learned from data using techniques like neural networks to predict a word given its context. This method is used in models like Word2Vec and GloVe.  Advanced language models like GPT-4 use embeddings to represent sentences or documents. These models use a Transformer network to capture relationships between all words in a sentence. The embeddings produced by these models are used for tasks like text classification, translation, and generation

ref: https://python.langchain.com/v0.1/docs/integrations/vectorstores/

