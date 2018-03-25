# 1. Introduction 
- The objective of the assignment is to visualize for thousands of scientific documents to digest a big source of text or even making out meaningful insights from the data is challenging.
- Three main area of user behavoir is analyzed and visualized.
    1. Visualize the top 10 authors for venue arXiv based on the number of publications he/she has made across all available years for arXiv.
    2. Visualize the top 5 papers for venue arXiv based on the number of citations across all available years for arXiv. (how many times this paper has been cited, so consider those with the largest inCitations from arXiv)
    3. Visualize the trend of the amount of publications across all available years for venue ICSE.
## Contributions
- Contributors of this project are:
    1. Yumeng Yin(E0227600)
    2. Shwe Soe Chun (E0210469)
- Task and responsibility allocation
    - Yumeng act as the main visualizer for Q1.
    - Soe Chun act as the main visualizer for Q2.
    - Q3 was done together.
    - Overall, github is used to host our code.  The code can be found [here](https://github.com/soechun/cirviz)

# 2. Visualization Purpose & Method
| Objective | Visualization |
| :-------: | :-----------: |
| 1 | Stacked bar chart |
| 2 | Bar chart |
| 3 | Line chart with trend line |

## 1. Top 10 authors for venue arXiv based on the number of publications he/she has made across all available years for arXiv.
### Method
1. Since the task is to visualize the top 10 authors for venue arXiv based on the number of publications. To retrive the data, we first filter out all data for venue arXiv. After that, the count of each author (distinguish author using ID) for each year are calculated. Total counts of all publications for all year for authors are calculated to get the ranking and retrive the top 10 authors' data.
2. From step 1, we now have the csv file which contain the top 10 authors and there count of publications for each year.
3. For each author we draw a stacked bar, we use different color to denote publication number for different year.

### Justification for visualization 
- To show the total ranking for those authors and to visualize the change of the publications among all years we select to use stacked bar chart. 

### Insight
From the final chart, we can find out that Damien Chablat is the top 1 from all of the publications in previous few years and he actively publish paper on arVix before 2010.
    
## 2. Visualize the top 5 papers for venue arXiv based on the number of citations across all available years for arXiv. (how many times this paper has been cited, so consider those with the largest inCitations from arXiv)
![Commits per working hour](heatmap.png)
### Method
    1. The following [github api](https://api.github.com/repos/torvalds/linux/stats/punch_card) https://api.github.com/repos/torvalds/linux/stats/punch_card is used together with ajax from jquery. The data is then feed into a function that do initial data processing.
    2. To visualize total commits per working hour (8.00 am~6.00 pm) of each day (Monday to Sunday), we choose to use heatmap to show the change of commits for different time and different day. 
    3. We further processed the data to include average commits per working hour across every day and average commits per day across every hour. This later comes into help to tell me when the devs are most active.
    4. After connecting all commits counts for different users of each day, we first define the two side of the heatap as Days(Sunday .etc) and Times(the exact time like 8 am). 
    5. After that the range of commits numbers are divided into 9 groups, denoted by nine color, using d3 function d3.scaleQuantile. As example the colors are representing the number of commits for following 9 range (0, 2), (2, 4), (4, 5), (5, 7), (7, 69), (69, 190), (190, 311), (311, 433), (433,)
    6. The block for different day and time will be filled using the different colors defined before according to the number of commits. Last but not least, mouse events are added to all blocks to show the number of commits for the block.
### Justification for visualization 
- For the commits per working hour, we decided to use heatmap as it is easier to compare between the time and the day. The graph can give have insights on which days or time has the most commit.  And also it can give us general insight on which days the users are most active. 
### Insight
- From the heatmap, we can find out that Tuesday 3pm, Wednesday 4pm and Friday 3pm the repo have the most commits. Sataurday have the least commits in the whole week. Moreover, we can conclude that overall, Tuesday and Wednesday are the most active on git among other days.

## 3. Visualize the trend of the amount of publications across all available years for venue ICSE.
![Language per repo](lang_per_repo.png)
### Method
    1. The following [github api](https://api.github.com/users/torvalds/repos) https://api.github.com/users/torvalds/repos is used together with ajax from jquery. This api gives the overall data of repositories under torvalds which contains link to language distribution of each repository.  Then we used another ajax query together with those links to gather language info from each repository.
    2. To the total bytes count of different programming languages used across ALL of specific author, we choose to use scatter bar chart so that we can both display the different languages for each repo and compare between different repos. 
    3. For the scatter bar chart, we first get the number of categories of languages used for all repos. After that, one color are selected for each of the langues.
    4. From our insight of the data, the language byte count is bias that C used in linux repo is almost 70 times of the second most language. In this case, for Y-axis we use d3.scaleLog() so that the display for different languages will be balanced. 
    5. For X-axis, since not all languages will exist in all repos, for the plot, only the used language will be plot for each repo. To achieve this, a list of languages contained for different repos is created first and used when defining the x-Axis.
    6. After all preparation, we plot a bar for each language for each repo based on the total count of byte and the color defined for the language.
    7. Last but not least, mouse event are added to the bar to display the bytes and the language for each bar.
### Justification for visualization 
- We found out that there is only countable number of repositories under torvals.  So, It is easier to compare languages across different repositoires. As we used a grouped barchart, it is also easier to compare which language is the most dominant in each repository.  We also used log scale on the Y axis as one of the repository (linux) is a very popular repository with a large number of C code written in it.  So without log scale, we won't be able to comprehend the difference between the rest of the repositories.
### Insight
- From the scatter bar chart we can find out that linux have the most bytes of codes and linux used most languages in the all repos. Linux and subsurface-for-dirk are the top two which have used more languages than other repos.
Language C is used mostly for most of the repos.
In the all repos, repo test-tlb have least codes.