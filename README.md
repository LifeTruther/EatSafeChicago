

# EatSafeChicago
My code camp capstone project is a Chrome extension. It provides address-specific food safety data 
to users of Google Maps upon viewing a given restaurant. I have actually been using this app to check
restaurants that me and my wife go out to, and I hope I will be able to share that with everybody!
![main screen image](images/fullpage0.0.7.jpg)

## File Organization
Credit to Rob W at <http://stackoverflow.com/users/938089/rob-w> for the idea of using two javascript pages 
to look at data on the current web page, and change the nature of the popup based on that data. So while
the main js file is the popup js, the heavy lifting of looking at the current tab and querying the data
portal is done in the getPageSource js. I got a pretty nice result with this organization, so I didn't mess
around with it too much. In the future however, I may experiment in an attempt to optimize result time.

## Finding the Address
I use a while loop sort through the children of the root document. If 'node.outerHTML.search' finds a 
'>Menu<' somewhere on the page (this one seemed to work really well), the same function will retrieve a
slice of the address, with some help from Regex.

## Retrieving and Inserting the Food Inspection Data
With the address saved as a variable, I insert it into a fetch request to the Chicago Data Portal. This 
produces an array that contains all of the health inspections performed at the address.
To insert the data into the popup, I use a 'chrome.runtime.onMessage.addListener' function. This allows 
me to 'send messages' from getPageSource back to popup and from there insert them into the innerHTML of
various divs on the webpage. I insert the database aka_name of the restaurant at the top of the popup. 
Just underneath is a color system that tells me how safe the restaurant is. Green restaurants have passed 
all three of their latest food inspections, and are labelled 'CLEAN'. Red restaurants have failed 
their latest food inspection, and are labelled 'SUSPICIOUS'. All other results fall under the yellow 
'NOT VERIFIED' label. I also send the date of the latest inpsection, and provide an expandible text box
showing the violations recorded in the latest inspection.
